function $localStorage($window) {
  return {
    set: function (key, value) {
      $window.localStorage[key] = value;
    },
    get: function (key) {
      if ($window.localStorage[key])
        return $window.localStorage[key];
      return null;
    },
    setObject: function (key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function (key) {
      if ($window.localStorage[key])
        return JSON.parse($window.localStorage[key]);
      return null;
    },
    clear: function () {
      $window.localStorage.clear();
    }
  };
}