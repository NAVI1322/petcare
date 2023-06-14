var mymodule = angular.module("itsModule", [])
mymodule.controller("itsController", function ($scope,$http) {

    $scope.jsonAry;

    $scope.dofetchdata=function()
    {
        $http.get("/fetch-user-data").then(ok,notOk);

        function ok(response)
        {
            $scope.jsonAry=response.data;
        }
        function notOk(response)
        {
            $scope.jsonAry=response.data;
        }
    }

});