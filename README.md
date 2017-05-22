# New Project Framework

This repository contains a lightweight starter framework for your new project using **NPM** and **Gulp**.

Bundled as a **SASS** friendly environment, complete with **BrowserSync** for ease of development.


## How Does it Work?

### Getting Started

Using your command line of choice, navigate to the cloned framework folder.

You will need to install all **Node** dependencies, which is an automated process. Simply run the following command,

~~~
$ npm install
~~~

If you do not have **Gulp** installed globally, install it using the following.

~~~
$ npm install -g gulp
~~~


### Development & Deployment

This framework uses **Gulp** to both watch and compile the project. Run the following command to get started,

~~~
$ gulp
~~~

Running gulp will compile the contents of the src folder, minifying any found stylesheets and JavaScript, then output it as a bundled production-ready dist folder. 

It will also launch **BrowserSync**, which will open a build of your project **(localhost:3000)** and watch for any changes. If a change is made, the project will automatically recompile and your browser page will refresh.


## Further Documentation

* [BrowserSync](https://www.browsersync.io/) - Synchronised browser testing.
* [Gulp](http://gulpjs.com/) - Automation toolkit.
* [NPM](https://www.npmjs.com/) - Package manager.
* [SASS](http://sass-lang.com/) - CSS extension language.


## Special Thanks

A special thank you must go to my former colleague [Leigh Gittoes](https://github.com/leigit), whose [Gulp-Sass-Starter](https://github.com/leigit/Gulp-Sass-Starter) formed the base of my own starter framework.
