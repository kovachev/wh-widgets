(function(angular)
{
    'use strict';

    var directives = angular.module('whWidgets.alerts.directives', []);
    var services = angular.module('whWidgets.alerts.services', []);

    angular.module(
        'whWidgets.alerts',
        [
            'whWidgets.alerts.directives',
            'whWidgets.alerts.services'
        ]
    );

    services.factory('AlertsService', [
        '$timeout',
        function($timeout)
        {
            // Private

            var _alerts = [];

            // Public

            var _public = {
                alerts: function()
                {
                    return _alerts;
                },

                showAlert: function(alert)
                {
                    if (typeof alert.title !== "string")
                        throw new Error('Alert is missing a valid "title" property.');

                    if (typeof alert.type !== "string")
                        alert.type = 'info';

                    if (typeof alert.timeout !== "number")
                        alert.timeout = 0;

                    if (typeof alert.smallIcon !== "string")
                    {
                        switch (alert.type)
                        {
                            case 'success':
                                alert.smallIcon = 'fa-check-circle';
                                break;

                            case 'warning':
                                alert.smallIcon = 'fa-exclamation-triangle';
                                break;

                            case 'danger':
                                alert.smallIcon = 'fa-times-circle';
                                break;

                            default:
                                alert.smallIcon = 'fa-exclamation-circle';
                                break;
                        }
                    }

                    _alerts.push(alert);

                    if (alert.timeout > 0)
                        $timeout(function() { _public.closeAlert(alert); }, alert.timeout);
                },

                closeAlert: function(value)
                {
                    // Get alert index
                    var ind = (typeof value === "number") ? value : _alerts.indexOf(value);

                    // Check if index is in bounds
                    if (ind < 0 || ind >= _alerts.length)
                        return;

                    // Get alert
                    var alert = _alerts[ind];

                    // Remove alert from array
                    _alerts.splice(ind, 1);

                    // Call onClose callback (if any)
                    if (typeof alert.onClose === "function")
                        alert.onClose(alert);
                }
            };

            return _public;
        }
    ]);

    directives.directive('whAlerts', [
            'AlertsService',
            function(AlertsService)
            {
                return {
                    restrict: 'EA',
                    transclude: true,
                    templateUrl: 'src/alerts/alerts.html',
                    scope: {},
                    link: function($scope)
                    {
                        $scope.alerts = [];

                        $scope.alertClose = function(alert)
                        {
                            AlertsService.closeAlert(alert);
                        };

                        $scope.getStyle = function(alert)
                        {
                            var style = {};

                            if (typeof alert.color === "string")
                                style['background-color'] = alert.color;

                            return style;
                        };

                        $scope.$watch(
                            AlertsService.alerts,
                            function(alerts)
                            {
                                $scope.alerts = alerts || [];
                            },
                            true
                        );
                    }
                };
            }
        ]
    );
})(angular);