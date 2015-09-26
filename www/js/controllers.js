angular.module('ola.controllers', ['ola.services'])
    .controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', AppCtrl])
    .controller('PlacesCtrl', ['$scope', '$ionicLoading', '$q', '$timeout', 'apiService', PlacesCtrl]);
