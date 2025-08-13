import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Student {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    lessons: string[];
}