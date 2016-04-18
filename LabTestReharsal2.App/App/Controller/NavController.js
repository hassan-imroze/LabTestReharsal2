var App;
(function (App) {
    var NavController = (function () {
        function NavController(authService, $state, $rootScope) {
            var self = this;
            self.authService = authService;
            self.stateService = $state;
            self.rootScopeService = $rootScope;
            var acc = self.authService;
            if (self.authService.IsAuthenticated()) {
                self.loadUser();
            }
            else {
                self.IsSignedIn = false;
            }
            self.rootScopeService.$on("SignedIn", function (event, args) {
                self.loadUser();
            });
        }
        NavController.prototype.loadUser = function () {
            var self = this;
            self.User = this.authService.AccountInfo;
            self.IsSignedIn = this.authService.IsAuthenticated();
        };
        NavController.prototype.Signout = function () {
            var self = this;
            self.authService.SignOut();
            self.loadUser();
            self.rootScopeService.$broadcast("SignedOut");
            self.stateService.go("root.signin");
        };
        NavController.$inject = ["AuthService", "$state", "$rootScope"];
        return NavController;
    }());
    App.NavController = NavController;
    angular.module("app").controller("NavController", NavController);
})(App || (App = {}));
//# sourceMappingURL=NavController.js.map