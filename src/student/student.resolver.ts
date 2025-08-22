import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { StudentType } from "./student.type";
import { StudentService } from "./student.service";
import { CreateStudentInput } from "./create-student.input";

@Resolver()
export class StudentResolver {
    constructor(private studentService: StudentService) {}

    @Query(() => [StudentType])
    students(): Promise<StudentType[]> {
        return this.studentService.getStudents();
    }

    @Query(() => StudentType)
    student(@Args('id') id: string): Promise<StudentType> {
        return this.studentService.getStudent(id);
    }

    @Mutation(() => StudentType)
    createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput): Promise<StudentType> {
        return this.studentService.createStudent(createStudentInput);
    }
}
