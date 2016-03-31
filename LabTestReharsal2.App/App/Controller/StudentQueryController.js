var App;
(function (App) {
    var StudentQueryController = (function () {
        //static $inject = ["$stateProvider", "$urlRouterProvider"];
        function StudentQueryController(studentSvc) {
            console.log("This is Student Query Controller");
            this.studentService = studentSvc;
            this.Students = [];
            this.Get();
        }
        StudentQueryController.prototype.Get = function () {
            var self = this;
            console.log("Here 1");
            this.studentService.Get()
                .then(function (result) { console.log("Here 3"); self.Students = result.data; }, function (error) { alert(error); });
        };
        StudentQueryController.$inject = ["StudentService"];
        return StudentQueryController;
    }());
    App.StudentQueryController = StudentQueryController;
    angular.module("app").controller("StudentQueryController", StudentQueryController);
})(App || (App = {}));
//# sourceMappingURL=StudentQueryController.js.map