wh-widgets [![License][license-image]][license-url]
==========================

A set of widgets for [AngularJS](http://angularjs.org/)

Includes:
    * Notifications
    * Alerts
    * Message Box

Demo could be found [here](http://kovachev.github.io/wh-widgets/).

##Dependencies:

1. [AngularJS](http://angularjs.org/)
1. [Bootstrap](http://getbootstrap.com/)
1. [Font Awesome](http://fortawesome.github.io/Font-Awesome/)

##Usage:

1. Add **whWidgets.alerts**, **whWidgets.message-box** and/or **whWidgets.notifications** to your `AngularJS` application dependencies.
```javascript
// Create the DemoApp module
angular.module('DemoApp', [
    ...
    'whWidgets.alerts', 
    'whWidgets.message-box', 
    'whWidgets.notifications',
    ...
]);
```

2. Add the placeholders in your `html`
```html
<body>
    ...
    <!-- Alerts -->
    <div data-wh-alerts></div>
    <!-- MessageBox -->
    <div data-wh-message-box></div>
    <!-- Notifications -->
    <div data-wh-notifications></div>
</body>
```

3. Using the widgets
  3.1 Alerts: Add `AlertsService` to the target controller injected dependencies. To show an alert call `AlertsService.showAlert(alert)`.
```javascript
AlertsService.showAlert({
    title: 'Demo',
    content: 'This is a demo.',
    type: 'success',
    icon: 'fa fa-fw fa-envelope',
    smallIcon: 'fa fa-fw fa-thumbs-up',
    timeout: null,
    onClose: function (alert)
    {
        $log.debug('Alert.onClose: %s [%s]', alert.title, alert.type);
    }
});
```

 3.2 Notification: Add `NotificationsService` to the target controller injected dependencies. To show an alert call `NotificationsService.showNotification(notification)`.
```javascript
NotificationsService.showNotification({
    title: 'Demo',
    content: 'This is a demo.',
    type: 'info',
    icon: 'fa fa-fw fa-bell',
    timeout: null,
    onActive: function (notification)
    {
        $log.debug('Notification.onActive(): %s [%s]', notification.title, notification.type);
    },
    onClose: function (notification)
    {
        $log.debug('Notification.onClose(): %s [%s]', notification.title, notification.type);
    }
});
```

 3.3 Message Box: Add `MessageBoxService` to the target controller injected dependencies. To show an alert call `MessageBoxService.showMessageBox(messageBox)`.
```javascript
MessageBoxService.showMessageBox({
    title: 'Demo',
    content: 'This is a demo.',
    buttons: [
        {
            label: 'Yes',
            title: 'Yes!',
            onClick: function (messageBox, button)
            {
                $log.debug('MessageBox.onClick: %s [%s]', messageBox.title, button.label);
            }
        },
        {
            label: 'No',
            title: 'No!',
            onClick: function (messageBox, button)
            {
                $log.debug('MessageBox.onClick: %s [%s]', messageBox.title, button.label);
            }
        }
    ],
    onClose: function (messageBox, button)
    {
        $log.debug('MessageBox.onClose: %s [%s]', messageBox.title, (button ? button.label : 'N/A'));
    }
});
```