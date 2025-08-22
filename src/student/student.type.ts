import { Field, ID, ObjectType } from "@nestjs/graphql";
import { LessonType } from "src/lesson/lesson.type";

@ObjectType('Student')
export class StudentType {
    @Field(type => ID)
    id: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field(type => [LessonType])
    lessons: LessonType[];
}
