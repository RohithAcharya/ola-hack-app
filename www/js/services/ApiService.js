function ApiService($http, $cordovaOauth) {
    var BASE_URL = "http://localhost:8100";
    var FACEBOOK_CLIENT_ID = 1608052562789205;

    var a = {
        facebookLogin: facebookLogin,
        logout: logout,
        getPlaces: getPlaces
    }
    return a;

    function facebookLogin() {
        $cordovaOauth.facebook(FACEBOOK_CLIENT_ID, ["user_birthday", "user_friends", "user_about_me", "user_status", "user_posts", "email", "public_profile"]).then(function(result) {
            // results
            console.log('yay');
            console.log(result);
        }, function(error) {
            // error
            alert('damn nigga');
        });
        // console.log('logged in');
    }

    function logout() {
        console.log('logged out');
    }

    function getPlaces(geolocation) {
        return $http.get(BASE_URL + "/get_locations", {
            params: geolocation
        });
    }
}
