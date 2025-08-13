import { Injectable } from '@nestjs/common';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { StudentType } from './student.type';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
    ) {}

    async createStudent(createStudentInput: CreateStudentInput): Promise<StudentType> {
        const { firstName, lastName } = createStudentInput;
        const student = this.studentRepository.create({
            id: uuidv4(),
            firstName,
            lastName,
        });
        return this.studentRepository.save(student);
    }
}
