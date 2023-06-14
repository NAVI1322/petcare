var mymodule = angular.module("itsModule", [])
mymodule.controller("itsController", function ($scope,$http) {

    $scope.citiesArry;
    $scope.fetchCities = function () {

        $http.get("/fetch-all-cities").then(fxOk, fxNotOk);

        function fxOk(response) {
            // alert(JSON.stringify(response.data));//data contains jsonArray
            $scope.citiesArry = response.data;
        }
        function fxNotOk(response) {
            alert(response.data);
        }
    }

//===================================================

    $scope.doShowSelcity = function () {

        alert($scope.selObj.city);

    }

    //=========================================

    $scope.caretakersArry;
    // $scope.caretakersArry = response.data;
    $scope.showCaretakers = function () {
        $http.get("/fetch-all-caretakers?City=" + $scope.selCity.city + "&pet=" + $scope.selPet).then(fxOk, fxNotOk);
        function fxOk(response) {
            $scope.caretakersArry = response.data;
            alert();
        }
        function fxNotOk(response) {
            alert(response.data);

        }
    }

    //======================================================

    $scope.moreInfoArry;
    $scope.getMore = function (Email) {
        $http.get("/moreInfo?email=" + Email).then(fxOk, fxNotOk);
        function fxOk(response) {
            $scope.moreInfoArry = response.data;
        }
        function fxNotOk(response) {
            alert(response.data);

        }
    }

 });
