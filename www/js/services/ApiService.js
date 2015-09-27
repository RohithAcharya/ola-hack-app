function ApiService($rootScope, $http, $cordovaOauth) {
    // var BASE_URL = "http://localhost:8100";
    //http://test-387dcco7.cloudapp.net/v1/ola/get_locations
    //http://ola-83r8k6yq.cloudapp.net/v1/ola
    var BASE_URL = "http://test-387dcco7.cloudapp.net/v1/ola";
    var FACEBOOK_CLIENT_ID = 1608052562789205;
    var FACEBOOK_GRAPH_API_URL = "https://graph.facebook.com/v2.4";

    var a = {
        facebookLogin: facebookLogin,
        getUserInfo: getUserInfo,
        logout: logout,
        getPlaces: getPlaces,
        bookCab: bookCab,
        getExploreLocations: getExploreLocations,
        exploreLocations: exploreLocations
    }
    return a;

    function facebookLogin() {
        var accessTokenScope = ["user_birthday", "user_friends", "user_about_me", "user_status", "user_posts", "email", "public_profile"];
        return $cordovaOauth.facebook(FACEBOOK_CLIENT_ID, accessTokenScope);
    }

    function getUserInfo(access_token) {
        var endpointUrl = FACEBOOK_GRAPH_API_URL + "/me";
        var userInfoParams = {
            fields: "id,name,posts.limit(200){message},about,bio,picture,cover",
            access_token: access_token
        }
        return $http.get(endpointUrl, {
            params: userInfoParams
        });
    }

    function logout() {
        console.log('logged out');
    }

    function getPlaces(geolocation, userInfo) {
        var postData = {
            latitude: geolocation.latitude,
            longitude: geolocation.longitude,
            text: userInfo
        };
        return $http.post(BASE_URL + "/get_locations", postData);
    }

    function bookCab(geolocation) {
        return $http.get(BASE_URL + "/book_cab", {
            params: geolocation
        });
    }

    function getExploreLocations(geolocation) {
        return $http.get(BASE_URL + "/explore_locations", {
            params: geolocation
        });
    }

    function exploreLocations(geolocation, placeIds) {
        var paras = {
            place_ids : placeIds,
                latitude : geolocation.latitude,
                longitude : geolocation.longitude
        };
        return $http.get(BASE_URL + "/explore_book_cab", {
            params: paras
        });
    }
}
