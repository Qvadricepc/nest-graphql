import { Injectable } from '@nestjs/common';
import { Lesson } from './lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { LessonType } from './lesson.type';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson)
        private lessonRepository: Repository<Lesson>,
    ) {}

    async getLesson(id: string): Promise<LessonType | null> {
        return this.lessonRepository.findOne({ where: { id } });
    }

    async createLesson(createLessonInput: CreateLessonInput): Promise<LessonType> {
        const { name, startDate, endDate } = createLessonInput;
        const lesson = this.lessonRepository.create({
            id: uuidv4(),
            name,
            startDate,
            endDate,
        });
        return this.lessonRepository.save(lesson);
    }

    async getAllLessons(): Promise<LessonType[]> {
        return this.lessonRepository.find();
    }
}
