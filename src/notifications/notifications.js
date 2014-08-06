(function(angular)
{
    'use strict';

    var directives = angular.module('whWidgets.notifications.directives', []);
    var services = angular.module('whWidgets.notifications.services', []);

    angular.module(
        'whWidgets.notifications',
        [
            'whWidgets.notifications.directives',
            'whWidgets.notifications.services'
        ]
    );

    services.factory('NotificationsService', [
        '$timeout',
        function($timeout)
        {
            // Private

            var _notifications = [];

            // Public

            var _public = {
                notifications: function()
                {
                    return _notifications;
                },

                showNotification: function(notification)
                {
                    if (typeof notification.title !== "string")
                        throw new Error('Notification is missing a valid "title" property.');

                    if (typeof notification.content !== "string")
                        notification.content = title;

                    if (typeof notification.type !== "string")
                        notification.type = 'info';

                    if (typeof notification.timeout !== "number")
                        notification.timeout = 0;

                    if (typeof notification.icon !== "string")
                    {
                        switch (notification.type)
                        {
                            case 'success':
                                notification.icon = 'fa fa-fw fa-check-circle';
                                break;

                            case 'warning':
                                notification.icon = 'fa fa-fw fa-exclamation-triangle';
                                break;

                            case 'danger':
                                notification.icon = 'fa fa-fw fa-times-circle';
                                break;

                            default:
                                notification.icon = 'fa fa-fw fa-exclamation-circle';
                                break;
                        }
                    }

                    notification.active = true;

                    for (var i = 0; i < _notifications.length; i++)
                        _notifications[i].active = false;

                    _notifications.unshift(notification);

                    if (notification.timeout > 0)
                        $timeout(function() { _public.closeNotification(notification); }, notification.timeout);
                },

                closeNotification: function(value)
                {
                    // Get notification index
                    var ind = (typeof value === "number") ? value : _notifications.indexOf(value);

                    // Check if index is in bounds
                    if (ind < 0 || ind >= _notifications.length)
                        return;

                    // Get notification
                    var notification = _notifications[ind];

                    // Remove notification from array
                    _notifications.splice(ind, 1);

                    // If this is the active notification set a new one
                    if (notification.active && _notifications.length > 0)
                    {
                        if (--ind < 0)
                            ind = 0;

                        _notifications[ind].active = true;
                    }

                    // Call onClose callback (if any)
                    if (typeof notification.onClose === "function")
                        notification.onClose(notification);
                },

                setActiveNotification: function(value)
                {
                    // Get notification index and length
                    var ind = (typeof value === "number") ? value : _notifications.indexOf(value),
                        len = _notifications.length;

                    // Check if index is in bounds
                    if (ind < 0 || ind >= len)
                        return;

                    // Get notification
                    var notification = _notifications[ind];

                    // Clear notifications active flag
                    for (var i = 0; i < len; i++)
                        _notifications[i].active = false;

                    // Set the new active notification
                    _notifications[ind].active = true;

                    // Call onActive callback (if any)
                    if (typeof notification.onActive === "function")
                        notification.onActive(notification);
                }
            };

            return _public;
        }
    ]);

    directives.directive('whNotifications', [
            'NotificationsService',
            function(NotificationsService)
            {
                return {
                    restrict: 'EA',
                    transclude: true,
                    templateUrl: 'src/notifications/notifications.html',
                    scope: {},
                    link: function($scope)
                    {
                        $scope.notifications = [];

                        $scope.getStyle = function(notification)
                        {
                            var style = {};

                            if (notification.active)
                                style['z-index'] = '10000';

                            if (typeof notification.color === "string")
                                style['background-color'] = notification.color;

                            return style;
                        };

                        $scope.setActive = function(notification)
                        {
                            NotificationsService.setActiveNotification(notification);
                        };

                        $scope.close = function(notification)
                        {
                            NotificationsService.closeNotification(notification);
                        };

                        $scope.$watch(
                            NotificationsService.notifications,
                            function(notifications)
                            {
                                $scope.notifications = notifications || [];
                            },
                            true
                        );
                    }
                };
            }
        ]
    );
})(angular);