# New Project Framework

This repository contains an easy to use, lightweight, front-end oriented framework for your new project using **NPM** and **Gulp**.

Bundled as a **SASS** friendly environment, complete with **BrowserSync** for ease of development.


## Features

* JavaScript ready
* SASS support
* NPM support
* Live browser preview
* Code build for production
* Automatic build file .zip compression
* Command Prompt Feedback & Error Reporting


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

Running gulp will compile the contents of the src folder, and copy them to the dist folder.

It will also launch **BrowserSync**, which will open a build of your project **(localhost:3000)** and watch for any changes. If a change is made, the project will automatically recompile and your browser page will refresh.

~~~
$ gulp build
~~~

Running gulp build will compile the contents of the **src** folder, minifying any found stylesheets and JavaScript, then output it as a bundled production-ready **build** folder. It will also compress the build folder as a .zip file.


## Further Documentation

* [BrowserSync](https://www.browsersync.io/) - Synchronised browser testing.
* [Gulp](http://gulpjs.com/) - Automation toolkit.
* [NPM](https://www.npmjs.com/) - Package manager.
* [SASS](http://sass-lang.com/) - CSS extension language.
