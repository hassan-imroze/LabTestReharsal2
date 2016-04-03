var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Entity = (function () {
        function Entity() {
        }
        return Entity;
    }());
    var Student = (function (_super) {
        __extends(Student, _super);
        function Student() {
            _super.apply(this, arguments);
        }
        return Student;
    }(Entity));
    App.Student = Student;
})(App || (App = {}));
