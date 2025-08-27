import { Injectable } from '@nestjs/common';
import { Lesson } from './lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { LessonType } from './lesson.type';
import { CreateLessonInput } from './lesson.input';
import { StudentType } from '../student/student.type';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson)
        private lessonRepository: MongoRepository<Lesson>,
    ) {}

    async getLesson(id: string): Promise<LessonType | null> {
        const lesson = await this.lessonRepository.findOne({ where: { id } });
        if (!lesson) {
            return null;
        }
        return {
            id: lesson.id,
            name: lesson.name,
            startDate: lesson.startDate,
            endDate: lesson.endDate,
            students: [] // This will be resolved by the field resolver
        };
    }

    async createLesson(createLessonInput: CreateLessonInput): Promise<LessonType> {
        const { name, startDate, endDate, students = [] } = createLessonInput;
        const lesson = this.lessonRepository.create({
            id: uuidv4(),
            name,
            startDate,
            endDate,
            studentIds: students
        });
        const savedLesson = await this.lessonRepository.save(lesson);
        return {
            id: savedLesson.id,
            name: savedLesson.name,
            startDate: savedLesson.startDate,
            endDate: savedLesson.endDate,
            students: [] // This will be resolved by the field resolver
        };
    }

    async getAllLessons(): Promise<LessonType[]> {
        const lessons = await this.lessonRepository.find();
        return lessons.map(lesson => ({
            id: lesson.id,
            name: lesson.name,
            startDate: lesson.startDate,
            endDate: lesson.endDate,
            students: [] // This will be resolved by the field resolver
        }));
    }

    async assignStudentToLesson(lessonId: string, studentsId: string[]): Promise<LessonType> {
        const lesson = await this.lessonRepository.findOne({ where: { id: lessonId } });
        if (!lesson) {
            throw new Error('Lesson not found');
        }
        const currentStudentIds = lesson.studentIds || [];
        lesson.studentIds = [...currentStudentIds, ...studentsId];
        const savedLesson = await this.lessonRepository.save(lesson);
        return {
            id: savedLesson.id,
            name: savedLesson.name,
            startDate: savedLesson.startDate,
            endDate: savedLesson.endDate,
            students: [] // This will be resolved by the field resolver
        };
    }
}
