module App {
    export class NavController {
        //   private chatService: ChatService;
        private authService: AuthService;
        User: AccountInfo;
        private stateService: angular.ui.IStateService;
        IsSignedIn: boolean;
        private rootScopeService: angular.IRootScopeService;

        static $inject = ["AuthService", "$state", "$rootScope"];

        constructor(authService: AuthService, $state: angular.ui.IStateService, $rootScope: angular.IRootScopeService) {
            var self = this;
            self.authService = authService;
            self.stateService = $state;
            self.rootScopeService = $rootScope;
            var acc = self.authService;
            if (self.authService.IsAuthenticated()) {
                self.loadUser();
            } else {
                self.IsSignedIn = false;
            }
            self.rootScopeService.$on("SignedIn", (event, args) => {
                self.loadUser();
            });
            
        }

        private loadUser(): void {
            var self = this;
            self.User = this.authService.AccountInfo;
            self.IsSignedIn = this.authService.IsAuthenticated();
        }

        Signout(): void {
            var self = this;
            self.authService.SignOut();
            self.loadUser();
            self.rootScopeService.$broadcast("SignedOut");
            self.stateService.go("root.signin");
        }
    }
    angular.module("app").controller("NavController", NavController);
}