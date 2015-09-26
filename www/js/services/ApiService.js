function ApiService($http) {
    var BASE_URL = "http://localhost:8100";
    var a = {
        login: login,
        logout: logout,
        getPlaces: getPlaces
    }
    return a;

    function login() {
        console.log('logged in');
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
