import { Resolver, Query } from "@nestjs/graphql";
import { LessonType } from "./lesson.type";

@Resolver()
export class LessonResolver {
    @Query(() => LessonType)
    lesson(): LessonType {
        return {
            id: '123',
            name: 'Lesson 1',
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            students: ['123', '456', '789'],
        };
    }
}