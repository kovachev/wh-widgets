(function(angular)
{
    'use strict';

    var directives = angular.module('whWidgets.message-box.directives', []);
    var services = angular.module('whWidgets.message-box.services', []);

    angular.module(
        'whWidgets.message-box',
        [
            'whWidgets.message-box.directives',
            'whWidgets.message-box.services'
        ]
    );

    services.factory('MessageBoxService', [
        '$log',
        function($log)
        {
            // Private

            var _messageBox = null;

            // Public
            var _public = {
                messageBox: function()
                {
                    return _messageBox;
                },

                showMessageBox: function(messageBox)
                {
                    if (typeof messageBox.title !== "string")
                        throw new Error('Message box is missing a valid "title" property.');

                    if (typeof messageBox.content !== "string")
                        messageBox.content = title;

                    var button;
                    if (!angular.isArray(messageBox.buttons))
                    {
                        button = {
                            label: 'Close',
                            title: 'Close this message.',
                            css: 'btn btn-default',
                            onClick: _public.closeMessageBox
                        };

                        messageBox.buttons = [];
                        messageBox.buttons.push(button);
                    }
                    else
                    {
                        var buttons = messageBox.buttons,
                            len = buttons.length,
                            i;

                        messageBox.buttons = [];

                        for (i = 0; i < len; i++)
                        {
                            button = buttons[i];

                            if (typeof button.label !== "string")
                            {
                                $log.error('Message box button is missing a valid "label" property.');
                                continue;
                            }

                            if (typeof button.title !== "string")
                                button.title = button.label;

                            if (typeof button.css !== "string")
                                button.css = 'btn btn-default';

                            messageBox.buttons.push(button);
                        }
                    }

                    messageBox.buttons = messageBox.buttons.reverse();

                    _messageBox = messageBox;
                },

                closeMessageBox: function(messageBox, value)
                {
                    // Clear message box object (releases UI)
                    _messageBox = null;

                    // Get button index
                    var ind = (typeof value === "number") ? value : messageBox.buttons.indexOf(value);

                    // Check if index is in bounds
                    if (ind < 0 || ind >= messageBox.buttons.length)
                    {
                        if (typeof messageBox.onClose === "function")
                            messageBox.onClose(messageBox);

                        return;
                    }

                    // Get button
                    var button = messageBox.buttons[ind];

                    if (typeof button.onClick === "function")
                        button.onClick(messageBox, button);

                    if (typeof messageBox.onClose === "function")
                        messageBox.onClose(messageBox, button);
                }
            };

            return _public;
        }
    ]);

    directives.directive('whMessageBox', [
            'MessageBoxService',
            function(MessageBoxService)
            {
                return {
                    restrict: 'EA',
                    transclude: true,
                    templateUrl: 'src/message-box/message-box.html',
                    scope: {},
                    link: function($scope)
                    {
                        $scope.messageBox = null;

                        $scope.close = function(messageBox, button)
                        {
                            MessageBoxService.closeMessageBox(messageBox, button);
                        };

                        $scope.$watch(
                            MessageBoxService.messageBox,
                            function(messageBox)
                            {
                                $scope.messageBox = messageBox || null;
                            },
                            true
                        );
                    }
                };
            }
        ]
    );
})(angular);