angular.module("thy.ngModel", [])
    .directive('thyNgModel', [function () {
        return {
            bindToController: {
                thyModel: '='
            },
            controller: ["$scope", "$element", "NgZone", "$timeout", function ($scope, $element, ngZone, $timeout) {

                let pendingDebounce = null;
                const debounceDelay = 200;

                ngZone.runOutsideAngular(() => {
                    $element.on('keyup change blur', (event) => {
                        this.$$debounceViewValueCommit();
                    });
                });

                this.$$debounceViewValueCommit = function () {
                    $timeout.cancel(pendingDebounce);
                    pendingDebounce = $timeout(() => {
                        this.thyModel = $element.val();
                    }, debounceDelay);
                };

                $scope.$watch(() => {
                    return this.thyModel;
                }, (newValue, oldValue) => {
                    if (newValue !== $element.val()) {
                        $element.val(newValue);
                    }
                });
            }]
        };
    }])
