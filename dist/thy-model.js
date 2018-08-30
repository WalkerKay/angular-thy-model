(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["thyModel"] = factory();
	else
		root["thyModel"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

angular.module("angular.thy.model", [])
    .provider('thyModelProvider', [function () {
        const _self = this;
        this.ngZone = null;
        this.$get = function () {
            return {
                getNgZone: function () {
                    return _self.ngZone;
                },
                setNgZoneProvider: function (ngZone) {
                    _self.ngZone = ngZone;
                }
            };
        };
    }])
    .directive('thyModel', [function () {
        return {
            bindToController: {
                thyModel: '='
            },
            controller: ["$scope", "$element", "$timeout", "thyModelProvider", function ($scope, $element, $timeout, thyModelProvider) {

                var _self = this;
                var pendingDebounce = null;
                var debounceDelay = 200;
                var ngZone = thyModelProvider.getNgZone();

                this.$$debounceViewValueCommit = function () {
                    $timeout.cancel(pendingDebounce);
                    pendingDebounce = $timeout(function () {
                        _self.thyModel = $element.val();
                    }, debounceDelay);
                };

                this.listen = function () {
                    $element.on('keyup change blur', function (event) {
                        _self.$$debounceViewValueCommit();
                    });
                };

                if (ngZone) {
                    ngZone.runOutsideAngular(function () {
                        _self.listen();
                    });
                } else {
                    _self.listen();
                }

                $scope.$watch(function () {
                    return _self.thyModel;
                }, function (newValue, oldValue) {
                    if (newValue !== $element.val()) {
                        $element.val(newValue);
                    }
                });
            }]
        };
    }]);


/***/ })
/******/ ]);
});