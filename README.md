![haxe-watchify logo](https://github.com/lucamezzalira/haxe-watchify/blob/master/logo.png)

# [Haxe-watchify](http://www.haxe-watchify.com)

Haxe-watchify is a command line daemon that check any files changes in your Haxe project and run the build automatically in background.

Currently haxe-watchify is compatible with _Haxe_ and _OpenFL_ projects.  
#### More information [Official website](http://www.haxe-watchify.com)

[![NPM](https://nodei.co/npm/haxe-watchify.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/haxe-watchify/)

[![NPM](https://nodei.co/npm-dl/haxe-watchify.png)](https://nodei.co/npm/haxe-watchify/)  

## How to install
In order to install haxe-watchify you just need to install from NPM as global package:

```
npm install haxe-watchify -g
```
After that you'll be able to use haxe-watchify in any of your Haxe projects.

## Options

--program - Choose between haxe and openfl.   
--hxml - hxml file to be run when files changed.  
--compiler - haxe server or static file.  
--port - port that haxe compiler will run on.   
--src - folder which will be watched for changes. this option can be specified multiple timers.  
--livereload - use livereloadx.
  
## Run Example

```
cd example
```
```
haxe build.hxml
```
```
../src/haxe-watchify.js --program haxe --src src --src lib --hxml build.hxml --compiler server
```

## Note for Windows users

**Haxe-watchify requires Python 2.7.x** to be installed in your machine in order to work.


## Contacts and suggestions

To report a bug please use the issues section on Github.

You can also check the [project roadmap](https://trello.com/b/53Bash8a) for the tool and the website.

if you want collaborate to the project or if you'd like a new feature, please [drop me a line](mailto:mezzalab@gmail.com) !

## Travis CI project status
[![Build Status](https://travis-ci.org/lucamezzalira/haxe-watchify.svg?branch=master)](https://travis-ci.org/lucamezzalira/haxe-watchify)
