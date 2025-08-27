import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { LessonType } from "./lesson.type";
import { LessonService } from "./lesson.service";
import { CreateLessonInput } from "./lesson.input";
import { AssignStudentsToLessonInput } from "./assign-students-to-lesson";
import { StudentType } from "../student/student.type";
import { StudentService } from "../student/student.service";

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService
    ) {}
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

    @Mutation(() => LessonType)
    assignStudentToLesson(
        @Args('assignStudentToLessonInput') assignStudentToLessonInput: AssignStudentsToLessonInput,
    ): Promise<LessonType> {
        return this.lessonService.assignStudentToLesson(assignStudentToLessonInput.lessonId, assignStudentToLessonInput.studentsId);
    }

    @ResolveField(returns => [StudentType])
    async students(@Parent() lesson: any): Promise<StudentType[]> {
        const studentIds = lesson.studentIds || [];
        if (!studentIds || studentIds.length === 0) {
            return [];
        }
        return this.studentService.getStudentsByIds(studentIds);
    }
}