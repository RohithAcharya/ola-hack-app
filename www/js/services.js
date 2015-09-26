angular.module('ola.services', [])
    .factory('apiService', ['$http', '$cordovaOauth', ApiService]);
