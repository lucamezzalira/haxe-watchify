# Haxe-watchify

Haxe-watchify is a command line daemon that check any files changes in your Haxe project and run the build automatically in background.
The files watched are with extension _.hx_, _.hxml_ or _.nmml_.
Currently haxe-watchify is compatible with _Haxe 3_ and above versions.

## How to install
In order to install haxe-watchify you just need to install from NPM as global package:

```
npm install haxe-watchify -g
```
After that you'll be able to use haxe-watchify in any of your Haxe projects.

## How to use
Using haxe-watchify is really simple, you can approach in different ways:

### command-line
To start haxe-watchify via command-line use this command:

```
haxe-watchify --hxml build.hxml
```

In this case, haxe-watchify is going to use the hxml file to build your project anytime you will change an Haxe file.
These are the other parameters that the command-line accepts:

```
--compiler server --port 6000
```

if you want use the completion server just add this parameter and automatically haxe-watchify will start haxe in server mode on the port specified with the _**-port**_ argument.
By default if the port it's not specified the server will start on _**port 6000**_

If you don't specify the compiler, by default haxe-watchify will use haxe in normal mode.

**haxe-watchify doesn't accept any other arguments, so if you need to specify build arguments please use the hxml file or the hx-watch.json file.**

### configuration file

Haxe-watchify, as many similar tools, is accepting a configuration file to define the parameters discussed above.
The file should be saved in the root folder of your Haxe project and should be named _**hx-watch.json**_.

This is the template structure to compile your project with the completion server:

```
{
  "build": {
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
    "hxml": "build.hxml"
  }
}

```

This is a template structure to compile your project with parameters instead of using a .hxml file:

```
{
  "build": {
    "params" : {
      "cp" : "src",
      "main" : "HelloWorld.hx",
      "x" : "bin/HelloWorld.n"
    }
  }
}

```

### help command

To print the help menu just type inside your console window:

```
haxe-watchify --help
```


## Contacts and suggestions

if you want to collaborate to the project or if you'd like a new feature, please [drop me a line](mailto:mezzalab@gmail.com) !

## Backlog

. _TODO:_ openFL compatibility  
. _TODO:_ decode haxe-watchify errors  
. _TODO:_ add check on other resources (json, images, ...)  
. _TODO:_ deploy on haxelib  
. _TODO:_ pre-build and post-build  
. _TODO:_ refactor Console and HaxeCompiler module  

## Ackwnoledgements

I'd like to thanks the [TFL](http://www.tfl.gov.uk) company that gave me the opportunity to write this tool during my commuting time. :D
