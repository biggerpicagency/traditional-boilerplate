# Traditional Boilerplate: HTML5/Sass/Grunt
An opinionated starting point for awesome Multi-Page Applications/Websites. Created and used by the folks at [Bigger Picture](http://www.biggerpicture.agency).

## What is this Traditional Boilerplate for?
This boilerplate is your first step in building a killer website. It contains necessary build processes, basic styles, and files that your website will need.
With such a stress (and rightly so) on website performance, we've developed our boilerplate with speed at its core. You'll get a [Page Speed Insights score](https://developers.google.com/speed/pagespeed/insights/) to be proud of with our minification and compression processes.   

Our boilerplate is inspired from [Google's Web Starter Kit](https://developers.google.com/web/tools/starter-kit/) and [HTML5 boilerplate](https://html5boilerplate.com). We use all their best bits and have redone what we belive to be weak elements. We believe this boilerplate will do the job you and your customers demand.
It has been prepared especially for creating HTML templates that will be implemented into our Laravel-based CMS [Alfred](http://www.alfred-cms.com/) that we engineered.

## Features
* **Sass** (SCSS syntax) compilation to pure, minified CSS (by node-sass)
* JS files concatenation and minification
* image optimisation
* SVG concatenation for files with ```icon-``` prefix
* **live browser reloading**
* based on **Grunt** and **Bower**
* friendly for Laravel-based applications

## Discover

### Installation
* ```npm install```
* ```bower install```
* ```grunt``` (remember that your vhost should have document root set to ```public/``` directory)

### Develop
* ```grunt```

Please edit frontend files only in the src/ folder. All images also should be uploaded there.

### Build production ready code
* ```grunt build``` - creates build application for production purposes

Because of our needs and Laravel application structure, as a default we keep build files in the repository. Of course you don't have to do it the same way and you have ability to ignore the files in the repository.

### This boilerplate and Alfred
If frontend code of website is ready and backend development is ready to start implementing HTML layouts into Alfred, an important file that should be placed in ./resources/cmsassets is a file called [Gruntfile.alfred.js](https://bitbucket.org/snippets/snowflakers/78kk5). It allows frontend developers to edit source frontend files of Alfred in resources/cmassets/ directory.

### Directory Structure: the most important elements

```
boilerplate-traditional/
  |- src/ (all application sources such as images, JS, Sass files & HTML)
  |  |- img/
  |  |- js/
  |  |- scss/
  |   - homepage.html
  |- vendor/ (Third-party libraries, installed by Bower)
  |- javascripts.config.json (contains a JSON object with a list of all JS files used in app (needs to be edited manually))
```

## The Bigger Picture Traditional Boilerplate Rules!
* Sass support - sorry is you are a Less fan, but we think Sass is the way right now
* new files created in newly created directories are not being watched by Grunt task runner in many other boilerplates based on Grunt task runner - we have elliminated this issue here
* you can easily inject JS files not only to ```body``` area, but also into ```head``` by **javascripts.config.json**
* after successfull developing just go with ```grunt build``` and deploy!

By default we've added necessary files like robots.txt, basic icons (thanks to Google's Web Starter Kit), and Web Server Config in .htaccess to reach the highest performance (gzip, caching etc.).

Enjoy coding using the Bigger Picture Traditional Boilerplate!
