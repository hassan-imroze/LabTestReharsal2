module App {
    export class StudentController {

        Student: Student;
        ErrorOrSuccessList: string[];
        statusClass: string;
        isSaving: boolean;
        private studentService: StudentService;

        static $inject = ["StudentService"];

        constructor(studentSvc: StudentService) {
            this.studentService = studentSvc;
            this.isSaving = false;
        }

        SaveAfterValidation() {
            var self = this;
            self.ErrorOrSuccessList = new Array<string>();
            self.isSaving = true;

            if (self.Student.Phone.length > 11) {

                self.statusClass = "errorList";
                self.ErrorOrSuccessList.push("Phone number cannot be greater than 11 digit");
            }
            if (self.Student.Email === undefined || self.Student.Email.length <= 0) {
                self.ErrorOrSuccessList.push("Email required");
                self.isSaving = false;
            } else {
                var successCallback = result => {
                    console.log(result);
                    if (result.data == false) {
                        if (self.ErrorOrSuccessList.length <= 0) {
                            self.Save();
                        } else {
                            self.isSaving = false;
                        }
                    }else {
                        self.statusClass = "errorList";
                        self.ErrorOrSuccessList.push("Email already exists");
                        self.isSaving = false;
                    }
                };

                var errorCallback = error => {
                    console.log(error);
                    self.statusClass = "errorList";
                    self.ErrorOrSuccessList.push(error.data);
                    self.isSaving = false;
                };

                self.studentService.EmailExists(self.Student.Email)
                    .then(successCallback, errorCallback);
            }
            
        }

        Save() {
            var self = this;
            self.ErrorOrSuccessList = new Array<string>();
            self.isSaving = true;

            var successCallback = result => {
                console.log(result);
                self.Student = new Student(); 
                self.statusClass = "successList";
                self.ErrorOrSuccessList.push("Saved Successfully");
                self.isSaving = false;

            };
            var errorCallback = error => {
                console.log(error);

                self.statusClass = "errorList";
                self.ErrorOrSuccessList.push(error.data);
                self.isSaving = false;
            };

            self.studentService.Save(self.Student)
                .then(successCallback, errorCallback);
        }
    }

    angular.module("app").controller("StudentController", StudentController);
}