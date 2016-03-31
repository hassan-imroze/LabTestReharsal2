module App {
    export class SignUpController {

        Register: Register;
        ErrorOrSuccessList: string[];
        statusClass: string;
        isSaving: boolean;
        private accService: AccountService;

        static $inject = ["AccountService"];

        constructor(accSvc: AccountService) {
            this.accService = accSvc;
            this.isSaving = false;
        }

        SignUp() {
            var self = this;
            self.ErrorOrSuccessList = new Array<string>();
            self.isSaving = true;

            if (self.Register.Password.trim() !== self.Register.ConfirmPassword.trim()) {

                self.statusClass = "errorList";
                self.ErrorOrSuccessList.push("Pasword and Confirm Pasword Does not Match");
            }

            if (self.ErrorOrSuccessList.length <= 0) {
                self.Save();
            } else {
                self.isSaving = false;
            }
            
        }

        Save() {
            var self = this;
            self.ErrorOrSuccessList = new Array<string>();
            self.isSaving = true;

            var successCallback = result => {
                console.log(result);
                self.Register = new Register();
                self.statusClass = "successList";
                self.ErrorOrSuccessList.push("Registered Successfully");
                self.isSaving = false;

            };
            var errorCallback = error => {
                console.log(error);

                self.statusClass = "errorList";
                self.ErrorOrSuccessList.push(error.data);
                self.isSaving = false;
            };

            self.Register.Email = self.Register.Email.trim();
            self.Register.Password = self.Register.Password.trim();
            self.Register.ConfirmPassword = self.Register.ConfirmPassword.trim();

            self.accService.SignUp(self.Register)
                .then(successCallback, errorCallback);
        }
    }

    angular.module("app").controller("SignUpController", SignUpController);
}