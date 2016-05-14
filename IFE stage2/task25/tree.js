var tree = angular.module('tree', []);
tree.controller('root', ['$scope', function($scope) {
    $scope.name = '前端攻城狮';
    $scope.names = ['HTML', 'CSS', 'Javascript'];
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

    $scope.deleteNode = function() {
        var keyword = $scope.nodeValue.trim();
        if (keyword) {
            console.log(keyword);
        } else {
            alert("Please input word you want to delete!");
        }
    }
}]);
