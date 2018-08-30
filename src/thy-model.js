angular.module("angular.thy.model", [])
    .provider('thyModelProvider', [function () {
        var _self = this;
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
