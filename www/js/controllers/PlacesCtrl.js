function PlacesCtrl($rootScope, $scope, $ionicLoading, $ionicPlatform, $q, $timeout, $cordovaGeolocation, apiService, userService, $state) {
    var loaderTemplate = "Loading..."
    $scope.$on('show-loader', function(){
        $ionicLoading.show({
            template: loaderTemplate
        });
    })
    $scope.$on('hide-loader', function(){
        $ionicLoading.hide();
    })

    $scope.$on('$ionicView.enter', function(e) {
        $scope.$broadcast('show-loader');
        var positionPromise = userService.getCurrentPosition()
            .then(function(geo) {
                userService.geolocation = geo;
                return apiService.getPlaces(userService.geolocation);
            })
            .then(getPlacesSuccessHandler, getPlacesErrorHandler).finally(function() {
                $scope.$broadcast('hide-loader');
            });
    });

    $rootScope.$on('user-logged-in', function(event, args) {
        var text = getUserText(userService.user)
        $scope.$broadcast('show-loader');
        apiService.getPlaces(userService.geolocation, text).then(getPlacesSuccessHandler, getPlacesErrorHandler).finally(function() {
            $scope.$broadcast('hide-loader');
        });
    });

    $scope.places = [];
    $scope.cabEta = "";
    $scope.userRef = userService;
    $scope.bookCab = bookCab;

    function bookCab(place) {
        $scope.$broadcast('show-loader');
        apiService.bookCab(userService.geolocation)
            .then(function(response) {
                // booking success
                userService.cabDetails = response.data.data.cab_details;
                alert('booking successful!');

                $state.go('app.timeline');
            }, function(response) {
                // booking error
                alert('damn nigga, booking error!');
            }).finally(function(){
                $scope.$broadcast('hide-loader');
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


}
