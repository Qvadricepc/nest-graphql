import { StudentType } from 'src/student/student.type';
import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Lesson {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    id: string;

    @Column()
    name: string;

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @Column({ default: [] })
    studentIds: string[];
}