var App;
(function (App) {
    var StudentController = (function () {
        function StudentController(studentSvc) {
            this.studentService = studentSvc;
            this.isSaving = false;
        }
        StudentController.prototype.SaveAfterValidation = function () {
            var self = this;
            self.ErrorOrSuccessList = new Array();
            self.isSaving = true;
            if (self.Student.Phone.length > 11) {
                self.statusClass = "errorList";
                self.ErrorOrSuccessList.push("Phone number cannot be greater than 11 digit");
            }
            if (self.Student.Email === undefined || self.Student.Email.length <= 0) {
                self.ErrorOrSuccessList.push("Email required");
                self.isSaving = false;
            }
            else {
                var successCallback = function (result) {
                    console.log(result);
                    if (result.data == false) {
                        if (self.ErrorOrSuccessList.length <= 0) {
                            self.Save();
                        }
                        else {
                            self.isSaving = false;
                        }
                    }
                    else {
                        self.statusClass = "errorList";
                        self.ErrorOrSuccessList.push("Email already exists");
                        self.isSaving = false;
                    }
                };
                var errorCallback = function (error) {
                    console.log(error);
                    self.statusClass = "errorList";
                    self.ErrorOrSuccessList.push(error.data);
                    self.isSaving = false;
                };
                self.studentService.EmailExists(self.Student.Email)
                    .then(successCallback, errorCallback);
            }
        };
        StudentController.prototype.Save = function () {
            var self = this;
            self.ErrorOrSuccessList = new Array();
            self.isSaving = true;
            var successCallback = function (result) {
                console.log(result);
                self.Student = new App.Student();
                self.statusClass = "successList";
                self.ErrorOrSuccessList.push("Saved Successfully");
                self.isSaving = false;
            };
            var errorCallback = function (error) {
                console.log(error);
                self.statusClass = "errorList";
                self.ErrorOrSuccessList.push(error.data);
                self.isSaving = false;
            };
            self.studentService.Save(self.Student)
                .then(successCallback, errorCallback);
        };
        StudentController.$inject = ["StudentService"];
        return StudentController;
    }());
    App.StudentController = StudentController;
    angular.module("app").controller("StudentController", StudentController);
})(App || (App = {}));
//# sourceMappingURL=StudentController.js.map