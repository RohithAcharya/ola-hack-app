var usr = null;

function UserService($rootScope, $q, $ionicPlatform, $timeout) {
    var _user = {};
    var _token = "";
    var _geolocation = {};
    var _cabDetails = {}
    var _exploreSelectedPlaces = [];
    var _exploreAllPlaces = [];
    var _exploreCurrentPlace = {};
    var _exploreNextEta = "";

    var x = {
        user: _user,
        token: _token,
        geolocation: _geolocation,
        cabDetails: _cabDetails,
        getCurrentPosition : getCurrentPosition,
        exploreSelectedPlaces : _exploreSelectedPlaces,
        exploreAllPlaces : _exploreAllPlaces,
        exploreCurrentPlace : _exploreCurrentPlace,
        exploreNextEta : _exploreNextEta
    };
    usr = x;
    return x;

    function getCurrentPosition() {
        var positionDeferred = $q.defer();
        $ionicPlatform.ready(function() {
            $timeout(function() {
                // ONLY EGL LOCATION WILL WORK
                navigator.geolocation.getCurrentPosition(function(position) {
                    // var geo = {
                    //     latitude: position.coords.latitude,
                    //     longitude: position.coords.longitude,
                    // };
                    var geo = {
                        latitude : 12.950072,
                        longitude : 77.642684
                    }
                    positionDeferred.resolve(geo);
                }, function(response) {
                    alert('geolocation error');
                    console.log(response);
                })
            }, 100);
        });

        return positionDeferred.promise;
    }

}
