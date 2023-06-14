var mymodule = angular.module("itsModule", [])
mymodule.controller("itsController", function ($scope, $http) {

    $scope.jsonAry;

    $scope.dofetchdata = function () {
        $http.get("/fetch-client-data").then(ok, notOk);

        function ok(response) {
            $scope.jsonAry = response.data;
        }
        function notOk(response) {
            $scope.jsonAry = response.data;
        }
    }
    //========================================
    $scope.doblock = function (email) {
        $http.get("/block-client?Email="  +email).then(ok, notOk);

        function ok(response) {
            $scope.dofetchdata();
        }
        function notOk(response) {
            alert("failed");
        }
    }

    //===========================================

    $scope.doresume = function (email) {
        $http.get("/resume-client?Email="  +email).then(ok, notOk);
        function ok(response) {
            $scope.dofetchdata();
        }
        function notOk(response) {
            alert("failed");
        }
    }
});