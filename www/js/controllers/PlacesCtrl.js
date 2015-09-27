function PlacesCtrl($rootScope, $scope, $ionicLoading, $ionicPlatform, $q, $timeout, $cordovaGeolocation, apiService, userService, $state) {
    $scope.$on('$ionicView.enter', function(e) {
        var positionPromise = getCurrentPosition()
            .then(function() {
                userService.geolocation = $scope.geolocation;
                return apiService.getPlaces($scope.geolocation);
            })
            .then(getPlacesSuccessHandler, getPlacesErrorHandler);
    });

    $rootScope.$on('user-logged-in', function(event, args) {
        var text = getUserText(userService.user)
        apiService.getPlaces($scope.geolocation, text).then(getPlacesSuccessHandler, getPlacesErrorHandler);
    });

    $scope.places = [];
    $scope.cabEta = "";
    $scope.geolocation = {};
    $scope.userRef = userService;
    $scope.bookCab = bookCab;

    function bookCab(place) {
        apiService.bookCab(userService.geolocation)
            .then(function(response) {
                // booking success
                userService.cabDetails = response.data.data.cab_details;
                alert('booking successful!');

                $state.go('app.timeline');
            }, function(response) {
                // booking error
                alert('damn nigga, booking error!');
            })
    }

    function getPlacesSuccessHandler(response) {
        var locations = response.data.data.locations;
        var eta = response.data.data.eta;

        var loc = [];
        for (var i = 0; i < locations.length; i++) {
            loc.push(locations[i])
        };
        $scope.cabEta = eta;
        $scope.places = loc.reverse();
    }

    function getPlacesErrorHandler(response) {
        alert('damn nigga, getPlaces fail');
        console.log(response);
    }

    function getUserText(userData) {
        var messages = [];
        for (var i = 0; i < userData.posts.data.length; i++) {
            var post = userData.posts.data[i];
            if (post.message)
                messages.push(post.message);
        };
        var bio = userData.bio
        var combined = bio + "." + messages.join(". ");
        return combined;
    }

    function getCurrentPosition() {
        var positionDeferred = $q.defer();
        $ionicPlatform.ready(function() {
            $timeout(function() {
                // ONLY EGL LOCATION WILL WORK
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
            }, 100);
        });

        return positionDeferred.promise;
    }
}
