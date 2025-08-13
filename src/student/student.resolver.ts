import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { StudentType } from "./student.type";
import { StudentService } from "./student.service";
import { CreateStudentInput } from "./create-student.input";

@Resolver()
export class StudentResolver {
    constructor(private studentService: StudentService) {}


    @Mutation(() => StudentType)
    createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput): Promise<StudentType> {
        return this.studentService.createStudent(createStudentInput);
    }
}
