// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
var App;
(function (App) {
    "use strict";
    var SideMenuController = (function () {
        function SideMenuController($location, $rootScope, authService, $state) {
            this.$location = $location;
            this.IsSignedIn = false;
            var self = this;
            self.authService = authService;
            self.stateService = $state;
            self.rootScopeService = $rootScope;
            self.rootScopeService.$on("SignedIn", function (event, args) {
                self.loadUser();
            });
            self.rootScopeService.$on("SignedOut", function (event, args) {
                self.loadUser();
            });
            self.loadUser();
        }
        SideMenuController.prototype.loadUser = function () {
            var self = this;
            self.User = this.authService.AccountInfo;
            self.IsSignedIn = this.authService.IsAuthenticated();
        };
        SideMenuController.$inject = ["$location", "$rootScope", "AuthService", "$state"];
        return SideMenuController;
    }());
    App.SideMenuController = SideMenuController;
    angular.module("app").controller("SideMenuController", SideMenuController);
})(App || (App = {}));
//# sourceMappingURL=SideMenuController.js.map