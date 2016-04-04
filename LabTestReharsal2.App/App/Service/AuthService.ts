module App {
    "use strict";

    export class AccountInfo {
        Username: string;
        AccessToken: string;
        IsAuthenticated: boolean;
        constructor() {
            this.Username = "";
            this.AccessToken = "";
            this.IsAuthenticated = false;
        } 
    }

    export class AuthService {
        private localStorageService: angular.local.storage.ILocalStorageService;
        AccountInfo: AccountInfo;
        static $inject: string[] = ["localStorageService"];
        constructor(localStorageService: angular.local.storage.ILocalStorageService) {
            this.AccountInfo = new AccountInfo();
            this.localStorageService = localStorageService;
        }

        SetInfo(): void {
            var self = this;
            self.localStorageService.set("AccountInfo", self.AccountInfo);
        }

        FillAuthData(): void {
            var self = this;
            self.AccountInfo = <any>self.localStorageService.get("AccountInfo");
        }

        IsAuthenticated(): boolean {
            return this.AccountInfo && this.AccountInfo.IsAuthenticated;
        }

    }

    angular.module("app").service("AuthService", AuthService);
}