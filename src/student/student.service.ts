import { Injectable } from '@nestjs/common';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { CreateStudentInput } from './create-student.input';
import { StudentType } from './student.type';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: MongoRepository<Student>,
    ) {}

    async createStudent(createStudentInput: CreateStudentInput): Promise<StudentType> {
        if (!createStudentInput) {
            throw new Error('CreateStudentInput is required');
        }
        
        const { firstName, lastName } = createStudentInput;
        const objectId = new ObjectId();
        const student = this.studentRepository.create({
            _id: objectId,
            id: uuidv4(),
            firstName,
            lastName,
            lessons: [],
        });
        return this.studentRepository.save(student);
    }

    async getStudents(): Promise<StudentType[]> {
        return this.studentRepository.find();
    }

    async getStudent(id: string): Promise<StudentType> {
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new Error('Student not found');
        }
        return student;
    }

    async getStudentsByIds(ids: string[]): Promise<StudentType[]> {
        if (!ids || ids.length === 0) {
            return [];
        }
        return this.studentRepository.find({ 
            where: { id: { $in: ids } } 
        });
    }
}
