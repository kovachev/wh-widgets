(function(angular)
{
    'use strict';

    // Create sub-modules
    angular.module('DemoApp.controllers', []);
    angular.module('DemoApp.services', []);

    // Create the DemoApp module
    var app = angular.module('DemoApp', [
        'ngSanitize',
        'whWidgets.alerts', 'whWidgets.message-box', 'whWidgets.notifications',
        'DemoApp.controllers', 'DemoApp.services'
    ]);

    var controllers = angular.module('DemoApp.controllers', []);
    controllers.controller('MainCtrl', [
        '$scope', '$log', 'InterfaceService',
        function($scope, $log, InterfaceService)
        {
            $scope.timeout = 0;

            var title = 'Lorem ipsum dolor sit amet',
                content = 'Nam at bibendum augue, ac tincidunt sem. Aenean et tortor ac quam tempus blandit. Pellentesque iaculis lacus quis sem consequat, at dapibus nibh tempor.',
                typeIndex = -1,
                type = ['success', 'info', 'warning', 'danger'];

            $scope.showAlert = function()
            {
                if (++typeIndex > 3) typeIndex = -1;

                InterfaceService.showAlert({
                    title: title,
                    content: content,
                    type: type[typeIndex],
                    icon: getRandomIcon(),
                    smallIcon: getRandomIcon(),
                    timeout: ($scope.timeout * 1000),
                    onClose: function(alert)
                    {
                        $log.debug('Alert.onClose: %s [%s]', alert.title, alert.type);
                    }
                });
            };

            $scope.showMessageBox = function()
            {
                InterfaceService.showMessageBox({
                    title: title,
                    content: content,
                    buttons: [
                        {
                            label: 'Yes',
                            title: 'Yes, sir!',
                            onClick: function(messageBox, button)
                            {
                                $log.debug('MessageBox.onClick: %s [%s]', messageBox.title, button.label);
                            }
                        },
                        {
                            label: 'No',
                            title: 'No, sir!',
                            onClick: function(messageBox, button)
                            {
                                $log.debug('MessageBox.onClick: %s [%s]', messageBox.title, button.label);
                            }
                        }
                    ],
                    onClose: function(messageBox, button)
                    {
                        $log.debug('MessageBox.onClose: %s [%s]', messageBox.title, (button ? button.label : 'N/A'));
                    }
                });
            };

            $scope.showNotification = function()
            {
                if (++typeIndex > 3) typeIndex = -1;

                InterfaceService.showNotification({
                    title: title,
                    content: content,
                    type: type[typeIndex],
                    icon: getRandomIcon(false),
                    timeout: ($scope.timeout * 1000),
                    onActive: function(notification)
                    {
                        $log.debug('Notification.onActive(): %s [%s]', notification.title, notification.type);
                    },
                    onClose: function(notification)
                    {
                        $log.debug('Notification.onClose(): %s [%s]', notification.title, notification.type);
                    }
                });
            };

            function getRandomInt(min, max)
            {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            function getRandomIcon(allowNull)
            {
                var icons = [null, 'fa-bell', 'fa-envelope', 'fa-comments', 'fa-clock-o', 'fa-thumbs-up'],
                    icon = icons[getRandomInt(0, (icons.length - 1))];

                if (!icon && allowNull === false)
                    icon = icons[1];

                return 'fa fa-fw ' + icon;
            }
        }
    ]);

    var services = angular.module('DemoApp.services', []);
    services.factory('InterfaceService', [
        'AlertsService', 'MessageBoxService', 'NotificationsService',
        function(AlertsService, MessageBoxService, NotificationsService)
        {
            return {
                showAlert: AlertsService.showAlert,
                showMessageBox: MessageBoxService.showMessageBox,
                showNotification: NotificationsService.showNotification
            };
        }
    ]);

    app.run([
        '$timeout', 'InterfaceService',
        function($timeout, InterfaceService)
        {
            $timeout(function()
            {
                InterfaceService.showAlert({
                    title: 'Welcome to whWidgets',
                    content: 'This is a sample Alert that will auto close in 5 seconds. A sample Notification will be show after that.',
                    type: 'info',
                    icon: 'fa fa-fw fa-thumbs-up',
                    timeout: 5000,
                    onClose: function()
                    {
                        InterfaceService.showNotification({
                            title: 'Welcome to whWidgets',
                            content: 'This is a sample Notification that will auto close in 5 seconds. A sample Message Box will be show after that.',
                            type: 'success',
                            icon: 'fa fa-fw fa-bell',
                            timeout: 5000,
                            onClose: function()
                            {
                                InterfaceService.showMessageBox({
                                    title: 'Demo',
                                    content: 'This is a sample Message Box. This completes the demo of all 3 widgets.'
                                });
                            }
                        });
                    }
                });
            }, 3000);
        }
    ]);
})(angular);