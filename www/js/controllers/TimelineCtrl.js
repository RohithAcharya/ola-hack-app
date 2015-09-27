function TimelineCtrl($rootScope, $scope, $q, $timeout, apiService, userService) {
    $scope.$on('$ionicView.enter', function(e) {
        $scope.events = [];
        if (userService.cabDetails.crn) {
            $scope.cabDetails =  userService.cabDetails;
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

    function clickPicture(){
    	alert('hey!');
    }

    function startRide() {
        var cabDetails = $scope.cabDetails;
        $scope.events.push({
            badgeClass: 'success',
            badgeIconClass: 'ion-checkmark',
            title: "You're on your way!",
            content: "<i class='ion-android-person'></i> " + cabDetails.driver_name + " <i class='ion-model-s'></i> " + cabDetails.car_model,
            action : null
        })
    }

    function rideIsComplete() {
        var ridePromise = $q.defer();
        $timeout(function() {
            ridePromise.resolve('ride completed');
        }, 1000)
        return ridePromise.promise;
    }

    function endRide() {
        $scope.events.push({
            badgeClass: 'info',
            badgeIconClass: 'ion-camera',
            title: 'Upload your #OlaStory selfie!',
            content: '&nbsp;',
            action : {name : 'Click Picture', event : clickPicture}
        })
    }
}
