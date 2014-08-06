wh-widgets
==========================

A set of widgets for [AngularJS](http://angularjs.org/)

Available widgets:
* Alerts
* Notifications
* Message Box

Demo could be found [here](http://kovachev.github.io/wh-widgets/).

##Dependencies:

1. [AngularJS](http://angularjs.org/)
2. [Bootstrap](http://getbootstrap.com/)
3. [Font Awesome](http://fortawesome.github.io/Font-Awesome/)

##Usage:

Add **whWidgets.alerts**, **whWidgets.message-box** and/or **whWidgets.notifications** to your `AngularJS` application dependencies.

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

Add the `placeholders` (widgets directives) in your `html`
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

##Using the widgets:

####Alerts:
Add `AlertsService` to the target controller injected dependencies.
To show an alert call `AlertsService.showAlert(alert)`.

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

####Notification:
Add `NotificationsService` to the target controller injected dependencies.
To show a notification call `NotificationsService.showNotification(notification)`.

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

####Message Box:
Add `MessageBoxService` to the target controller injected dependencies.
To show a message box call `MessageBoxService.showMessageBox(messageBox)`.

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
