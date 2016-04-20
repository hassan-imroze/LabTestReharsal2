// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
module App {
    "use strict";

    export class SideMenuController {
        User: AccountInfo;
        private stateService: angular.ui.IStateService;
        IsSignedIn: boolean = false;
        private rootScopeService: angular.IRootScopeService;
        private authService: AuthService;
        Routes: string[];
        static $inject: string[] = ["$location", "$rootScope", "AuthService", "$state"];

        constructor(private $location: angular.ILocationService, $rootScope: angular.IRootScopeService, authService: AuthService, $state: angular.ui.IStateService) {
            var self = this;
            self.authService = authService;
            self.stateService = $state;
            self.rootScopeService = $rootScope;

            self.rootScopeService.$on("SignedIn", (event, args) => {
                self.loadUser(); 
            });
            self.rootScopeService.$on("SignedOut", (event, args) => {
                self.loadUser();
            });

            self.loadUser();
        }
        

       

        private loadUser(): void {
            var self = this;
            self.User = this.authService.AccountInfo;
            self.IsSignedIn = this.authService.IsAuthenticated();
        }

    }

    angular.module("app").controller("SideMenuController", SideMenuController);
}