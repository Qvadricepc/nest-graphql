import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { LessonType } from "./lesson.type";
import { LessonService } from "./lesson.service";
import { CreateLessonInput } from "./lesson.input";

@Resolver()
export class LessonResolver {
    constructor(private lessonService: LessonService) {}
    @Query(() => LessonType, { nullable: true })
    lesson(
        @Args('id') id: string,
    ): Promise<LessonType | null> {
        return this.lessonService.getLesson(id);
    }

    @Query(() => [LessonType])
    getAllLessons(): Promise<LessonType[]> {
        return this.lessonService.getAllLessons();
    }  
    
    @Mutation(() => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput,
    ): Promise<LessonType> {
        return this.lessonService.createLesson(createLessonInput);
    }
}