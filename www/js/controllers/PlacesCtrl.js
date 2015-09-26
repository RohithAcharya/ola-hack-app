function PlacesCtrl($scope, $ionicLoading, $q, $timeout, apiService) {
    $scope.$on('$ionicView.enter', function(e) {
        console.log('$ionicView.enter. This is where we should init the places.');
        var positionPromise = getCurrentPosition()
            .then(function() {
                return apiService.getPlaces($scope.geolocation);
            })
            .then(function(response) {
                console.log(response);
                var locations = response.data.data.locations;
                var loc = [];
                for (var i = 0; i < locations.length; i++) {
                    loc.push(locations[i])
                };
                $scope.places = loc;
            }, function(response) {
                console.log(response);
            });
    });
    $scope.places = [];
    $scope.geolocation = {};

    function getCurrentPosition() {
        var positionDeferred = $q.defer();
        $timeout(function() {
            navigator.geolocation.getCurrentPosition(function(position) {
                $scope.geolocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                positionDeferred.resolve('geolocation ready');
            }, function(response) {
                alert('geolocation error');
                console.log(response);
            })
        }, 1000);
        return positionDeferred.promise;
    }
}
