import { HttpGet, IActionResult, Ok, Controller } from "../../framework/core";

@Controller('api/students')
export class StudentsController {
    constructor() {
    }

    @HttpGet('')
    public async getStudents(): Promise<IActionResult> {
        return new Ok();
    }
}