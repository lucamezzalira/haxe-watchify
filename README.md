![haxe-watchify logo](https://github.com/lucamezzalira/haxe-watchify/blob/master/logo.png)

# Haxe-watchify

Haxe-watchify is a command line daemon that check any files changes in your Haxe project and run the build automatically in background.
The files watched are with the following extensions:
* _.hx_  
* _.hxml_  
* _.nmml_  
* _.jpg_  
* _.jpeg_  
* _.gif_  
* _.png_  
* _.xml_  
* _.json_  
* _.yml_  
* _.css_  
* _.php_  
* _.html_  

Currently haxe-watchify is compatible with _Haxe_ and _OpenFL_ projects.

[![NPM](https://nodei.co/npm/haxe-watchify.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/haxe-watchify/)

 [![NPM](https://nodei.co/npm-dl/haxe-watchify.png)](https://nodei.co/npm/haxe-watchify/)  

## How to install
In order to install haxe-watchify you just need to install from NPM as global package:

```
npm install haxe-watchify -g
```
After that you'll be able to use haxe-watchify in any of your Haxe projects.

## How to use
Using haxe-watchify is really simple, you can approach in different ways:

### command-line
First of all navigate to the project folder, then start haxe-watchify via command-line using:

```
haxe-watchify --program haxe --hxml build.hxml
```

In this case, haxe-watchify is going to use the hxml file to build your project, so anytime you will change an Haxe file, haxe-watchify will rebuild your Haxe project in background.
These are the other parameters that the command-line accepts:

```
Usage: haxe-watchify [options]

Options:
    -h, --help            output usage information
    -V, --version         output the version number
    --program <value>     set the tool to build your project, the parameter could be 'haxe' or 'openfl'. The defualt value is 'haxe'
    --hxml <value>        set the hxml file to use for the build
    --compiler <value>    set 'server' to use the completion server. The default value is 'local'
    --port <value>        set the port number. By default port is 6000
    --buildType <value>   set the command to use on OpenFL targets: build or test. The defualt value is 'build'
    --src <value>         set the Haxe classes source folder. The default value is the folder where you run haxe-watchify
    --livereload <value>  set the local folder where the server will point
    --platforms <values>  set the platform to build OpenFL project separated by , (e.g.: flash,html5)
```

#### build an Haxe project
To build an Haxe project via command line you just need to type:

```
haxe-watchify --program haxe --hxml build.hxml
```

if you want use the completion server just add this parameter and automatically haxe-watchify will start haxe in server mode on the port specified with the _**-port**_ argument:

```
haxe-watchify --program haxe --hxml build.hxml --compiler server --port 6789
```

By default if the port it's not specified the server will start on _**port 6000**_

If you don't specify the compiler, by default haxe-watchify will use haxe in normal mode.

**haxe-watchify doesn't accept any other arguments for Haxe, so if you need to specify build arguments please use the .hxml file or the hx-watch.json file.**

#### build an OpenFL project

To build an OpenFL project via command line you just need to type:

```
haxe-watchify --program openfl --platforms html5,flash,tizen
```
When you specify OpenFL as program you'll not be able to use the completion server.
Currently haxe-watchify is using only the ```build``` command, in the next version you'll be able to specify ```test``` or ```build```.

**haxe-watchify doesn't accept any other arguments for OpenFL, so if you need to specify build arguments please use the .xml**

### configuration file

As many similar tools Haxe-watchify is accepting a configuration file to define the parameters discussed above.
The file should be saved in the root folder of your Haxe or OpenFL project and should be called _**hx-watch.json**_.

#### build an Haxe project

This is the template structure to compile your project with the completion server:

```
{
  "build": {
    "program" : "haxe",
    "compiler" : "server",
    "port" : "6005",
    "hxml": "build.hxml"
  }
}

```

This is a template structure to compile your project without the completion server:

```
{
  "build": {
    "program" : "haxe",
    "hxml": "build.hxml"
  }
}

```

This is a template structure to compile your project with parameters instead of using a .hxml file:

```
{
  "build": {
    "program" : "haxe",
    "params" : {
      "cp" : "src",
      "main" : "HelloWorld.hx",
      "x" : "bin/HelloWorld.n"
    }
  }
}

```

You can now specify the folder to watch by haxe-watchify with _src_ parameter :

```
{
  "build": {
    "program" : "haxe",
    "hxml" : "build.hxml",
    "src" : "source"
  }
}

```

#### build an OpenFL project

This is the template structure to compile your OpenFL project:

```
{
  "build": {
    "program" : "openfl",
    "platforms" : ["flash", "tizen", "html5"]
  }
}

```
Last but not least on OpenFL you can decide if run the build with the _build_ or _test_ command in this way:

```
{
  "build": {
    "program" : "openfl",
    "buildType" : "test", //set test or build as parameter
    "src" : "Source",
    "platforms" : ["flash", "tizen", "html5"]
  }
}

```

## Live Reload

From version _1.2.0_, Haxe-watchify would be able to start a server with live reload feature on any browser window that is open at the url _**http://localhost:35729/**_ or from another device replacing localhost with the IP of your machine.

So anytime you'll change in the watched folder any class or resource file automatically haxe-watchify will update your browser window as you can see in this video:

[![haxe-watchify video in action](http://img.youtube.com/vi/642TwxCkWsE/0.jpg)](http://www.youtube.com/watch?v=642TwxCkWsE)

You can use the live reload option via command-line or in the configuration file simply setting the project output folder:
```
{
  "build": {
    "program" : "openfl",
    "buildType" : "test", //set test or build as parameter
    "src" : "Source",
    "livereload" : "Export",
    "platforms" : ["flash", "tizen", "html5"]
  }
}
```

So the output folder will be the root folder of your server and if you want to open the html5 version created by OpenFL, for instance, you'll type inside your browser _**http://localhost:35729/html5/index.html**_.  
This feature works with HTML and Flash targets generated by Haxe or OpenFL.

Obviously the **live reload feature works on any browser of any device, simulators or emulators**

### help command

To print the help menu just type inside your console window:

```
haxe-watchify --help
```

## Note for Windows users

Haxe-watchify requires Python 2.7.x to be installed in your machine in order to work.


## Contacts and suggestions

To report a bug please use the issues section on Github.

if you want collaborate to the project or if you'd like a new feature, please [drop me a line](mailto:mezzalab@gmail.com) !

## Backlog

. _HAXE_: add nme target configuration  
. _GENERAL_: add plugins strategy for JSON file  
. _GENERAL_: add checkstyle plugin  
. _GENERAL_: add mochahx plugin  
. _GENERAL_: add munit plugin  
. _GENERAL_: deploy on haxelib  

## Bugs

. _OPENFL_: show an error when OpenFL compiles but the target is compiled correctly  

## Tech Debt

. _TODO:_ unit test  
. _TODO:_ abstract compiler modules  
. _TODO:_ rewrite in JS.next()

## Travis CI project status
[![Build Status](https://travis-ci.org/lucamezzalira/haxe-watchify.svg?branch=master)](https://travis-ci.org/lucamezzalira/haxe-watchify)
