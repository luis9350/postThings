This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myBlank blank
```

Then, to run it, cd into `myBlank` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

## Include AngularFire2
go to this page to check the documentation  https://github.com/angular/angularfire2

check your version of angular and ionic, in this case wo to use https://github.com/angular/angularfire2/blob/master/docs/Auth-with-Ionic3-Angular4.md

to install angularfire2
```bash
$ npm install angularfire2 firebase promise-polyfill --save
```
## Add Camera function
install
```bash
$ ionic cordova plugin add cordova-plugin-camera
$ npm install --save @ionic-native/camera
```

## Add ImagePicker
```bash
$ ionic cordova plugin add cordova-plugin-telerik-imagepicker --variable PHOTO_LIBRARY_USAGE_DESCRIPTION="your usage message"
$ npm install --save @ionic-native/image-picker
```
