function ExploreCtrl($rootScope, $scope, apiService, userService, $state, $ionicLoading) {
    $scope.$on('$ionicView.enter', function(e) {
        $scope.$broadcast('show-loader');
        var positionPromise = userService.getCurrentPosition()
            .then(function(geo) {
                userService.geolocation = geo;
                return apiService.getExploreLocations(userService.geolocation);
            })
            .then(exploreSuccess, exploreError).finally(function() {
                $scope.$broadcast('hide-loader');
            });

    });
    $scope.$on('show-loader', function() {
        $ionicLoading.show({
            template: loaderTemplate
        });
    })
    $scope.$on('hide-loader', function() {
        $ionicLoading.hide();
    })
    $scope.places = [];
    $scope.explore = explore;

    function exploreSuccess(response) {
        var locations = response.data.data.locations;
        var eta = response.data.data.eta;
        var loc = [];
        for (var i = 0; i < locations.length; i++) {
            loc.push(locations[i])
        };
        $scope.places = loc;
    }

    function exploreError(response) {
        alert('damn nigga, getExploreLocations fail');
    }

    function explore() {
        $scope.$broadcast('show-loader');
        var allPlaces = $scope.places;
        userService.exploreAllPlaces = allPlaces;
        var selectedPlaceIds = [];
        var selectedPlaces = [];
        for (var i = 0; i < allPlaces.length; i++) {
            if (allPlaces[i].selected) {
                selectedPlaceIds.push(allPlaces[i].place_id);
                selectedPlaces.push(allPlaces[i]);
            };
        };
        userService.exploreSelectedPlaces = selectedPlaces;

        var geo = userService.geolocation;

        apiService.exploreLocations(geo, selectedPlaceIds.join(","))
            .then(function(response) {
                console.log('done!');
                userService.exploreCurrentPlace = response.data.data.locations;
                userService.exploreNextEta = response.data.data.eta;
                $state.go('app.exploretimeline')

            }, function(response) {
                alert('damn nigga, exploreLocations fail');
            }).finally(function(){
                $scope.$broadcast('hide-loader');
            })

    }
    // $scope.places = [{
    //     icon: 'img/ionic.png',
    //     name: 'Bangalore Palace',
    //     distance: 30.7,
    //     travel_time_in_minutes: 43,
    //     selected: false,
    //     description: "Tipu Sultan's summer retreat.",
    //     recommendedBy: ["Amrith", "Anirudh", "John Doe", "Alice", "Jimi"]
    // }, {
    //     icon: 'img/ionic.png',
    //     name: 'Visweswaraya Technological Museum',
    //     distance: 25.4,
    //     travel_time_in_minutes: 38,
    //     selected: false,
    //     description: "One of the coolest places places in Bangalore!",
    //     recommendedBy: ["Bjarne", "John Skeet", "Alice"]
    // }]

}
