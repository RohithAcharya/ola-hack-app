function TimelineCtrl($rootScope, $scope, $q, $timeout, $ionicPlatform, $cordovaCamera, apiService, userService, $ionicScrollDelegate) {
    $scope.$on('$ionicView.enter', function(e) {
        $scope.events = [];
        if (userService.cabDetails.crn) {
            $scope.cabDetails = userService.cabDetails;
            $timeout(function() {
                startRide();
            }, 300);
            rideIsComplete().then(function() {
                endRide();
            })
        }
    });
    $scope.cabDetails = {};
    $scope.events = [];
    $scope.clickPicture = clickPicture;
    $scope.addTextEvent = addTextEvent;
    $scope.addPictureEvent = addPictureEvent;

    function resizeView() {
        $timeout(function() {
            $ionicScrollDelegate.resize();
            $timeout(function() {
                $ionicScrollDelegate.scrollBottom(true);
            }, 100);
        }, 200)

    }

    function addTextEvent() {
        $scope.events.push({
            badgeClass: 'warning',
            badgeIconClass: 'ion-android-chat',
            type: 'text',
            title: "My cool #OlaStory",
            content: "Hey, I'm having an awesome time!"
        })
        resizeView();
    }

    function addPictureEvent(eventTitle) {
        $scope.events.push({
            badgeClass: 'info',
            badgeIconClass: 'ion-camera',
            type: 'picture',
            title: eventTitle,
            content: '&nbsp;',
        })
        resizeView();
    }

    function clickPicture(event) {
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
                // var image = document.getElementById('myImage');
                // image.src = imageURI;
                event.picture = imageURI;
            }, function(err) {
                // error
                alert('damn nigga, camera fail');
            });
        });
    }

    function startRide() {
        var cabDetails = $scope.cabDetails;
        $scope.events.push({
            badgeClass: 'success',
            badgeIconClass: 'ion-checkmark',
            type: 'auto',
            title: "You're on your way!",
            content: "<i class='ion-android-person'></i> " + cabDetails.driver_name + " <i class='ion-model-s'></i> " + cabDetails.car_model,
            action: null
        })
        resizeView();
    }

    function rideIsComplete() {
        var ridePromise = $q.defer();
        $timeout(function() {
            ridePromise.resolve('ride completed');
        }, 5000)
        return ridePromise.promise;
    }

    function endRide() {
        addPictureEvent('The end delightful journey :) #OlaStory');
        resizeView();
    }
}
