angular.module('ola.services', ['ola.utils'])
    .factory('apiService', ['$rootScope', '$http', '$cordovaOauth', ApiService])
    .factory('userService', ['$rootScope', '$q', '$ionicPlatform', '$timeout', UserService]);
