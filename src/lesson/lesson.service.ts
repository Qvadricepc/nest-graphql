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
        return this.lessonRepository.findOne({ where: { id } });
    }

    async createLesson(createLessonInput: CreateLessonInput): Promise<LessonType> {
        const { name, startDate, endDate } = createLessonInput;
        const objectId = new ObjectId();
        const lesson = this.lessonRepository.create({
            _id: objectId,
            id: uuidv4(),
            name,
            startDate,
            endDate,
            students: [],
        });
        return this.lessonRepository.save(lesson);
    }

    async getAllLessons(): Promise<LessonType[]> {
        return this.lessonRepository.find();
    }

    async assignStudentToLesson(lessonId: string, studentsId: string[]): Promise<LessonType> {
        const lesson = await this.lessonRepository.findOne({ where: { id: lessonId } });
        if (!lesson) {
            throw new Error('Lesson not found');
        }
        const currentStudents = lesson.students || [];
        lesson.students = [...currentStudents, ...studentsId] as StudentType[];
        return this.lessonRepository.save(lesson);
    }
}
