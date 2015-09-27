function ExploreTimelineCtrl($scope, userService, apiService, $timeout, $ionicScrollDelegate, $ionicPlatform, $cordovaCamera, $ionicLoading) {
    $scope.$on('show-loader', function() {
        $ionicLoading.show({
            template: loaderTemplate
        });
    })
    $scope.$on('hide-loader', function() {
        $ionicLoading.hide();
    })
    $scope.$on('$ionicView.enter', function(e) {
        $scope.$broadcast('show-loader');
        var places = [];

        $scope.places = [];
        $scope.currentPlace = 0;
        $scope.events = [];

        for (var i = 0; i < userService.exploreSelectedPlaces.length; i++) {
            var p = userService.exploreSelectedPlaces[i];
            p.isDone = false;
            places.push(p);
            if (userService.exploreSelectedPlaces[i].place_id == userService.exploreCurrentPlace.place_id) {
                $scope.currentPlace = i;
            }
        };
        $scope.places = places;
        $scope.nextEta = userService.exploreNextEta;
        addEvent($scope.currentPlace);
        $scope.$broadcast('hide-loader');
    });


    $scope.nextEta = "";
    $scope.currentPlace = 0;
    $scope.places = [];
    $scope.events = [];
    $scope.isLastOne = isLastOne;

    function resizeView() {
        $timeout(function() {
            $ionicScrollDelegate.resize();
            $timeout(function() {
                $ionicScrollDelegate.scrollBottom(true);
            }, 100);
        }, 200)

    }

    function addEvent(index) {
        var places = $scope.places;
        if (places[index]) {
            $scope.events.push({
                badgeClass: 'info',
                badgeIcon: places[index].icon,
                title: places[index].name,
                content: 'I\'m lovin\' it!',
                pictures: [],
                nextPlace: nextPlace,
                addPicture: addPicture,
                place: places[index]
            })
        }

    }

    function addPicture() {
        var context = this;
        // context.pictures.push("img/place-holder-1.png");
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            // allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            // targetWidth: 100,
            // targetHeight: 100,
            // popoverOptions: CameraPopoverOptions,
            // saveToPhotoAlbum: false,
            // correctOrientation: true
        };
        $ionicPlatform.ready(function() {
            $cordovaCamera.getPicture(options).then(function(imageURI) {
                context.pictures.push(imageURI);
            }, function(err) {
                // error
                // alert('damn nigga, camera fail');
            });
        });
    }

    function nextPlace() {
        var context = this;
        context.place.isDone = true;
        exploreAgain();
    }

    function isLastOne() {
        return $scope.events.length == $scope.places.length;
    }

    function exploreAgain() {
        var selectedPlaces = $scope.places;
        var selectedPlaceIds = [];
        for (var i = 0; i < selectedPlaces.length; i++) {
            if (selectedPlaces[i].selected) {
                if (!selectedPlaces[i].isDone) {
                    selectedPlaceIds.push(selectedPlaces[i].place_id);
                }
            };
        };

        var geo = userService.geolocation;

        apiService.exploreLocations(geo, selectedPlaceIds.join(","))
            .then(function(response) {
                console.log('done!');
                userService.exploreCurrentPlace = response.data.data.locations;
                userService.exploreNextEta = response.data.data.eta;

                for (var i = 0; i < $scope.places.length; i++) {
                    var p = $scope.places[i];
                    if ($scope.places[i].place_id == userService.exploreCurrentPlace.place_id) {
                        $scope.currentPlace = i;
                    }
                };
                addEvent($scope.currentPlace);

            }, function(response) {
                alert('damn nigga, exploreLocations fail');
            })

    }

}
