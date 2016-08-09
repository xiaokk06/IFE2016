var tree = angular.module('tree', []);
tree.controller('rootNode', ['$scope', function($scope) {
    $scope.name = '前端攻城狮';
}]);

tree.controller('queryNode', ['$scope', function($scope) {
    $scope.queryNode = function() {
        var keyword = $scope.nodeValue.trim();
        if (keyword) {
            console.log(keyword);
        } else {
            alert("Please input word you want to query!");
        }
    }

    $scope.deleteHighlight = function() {

    }
}]);

tree.controller('initNode',['$scope',function($scope){
    $scope.nodes=['html','css','javascript','nodeJs'];
}]);


