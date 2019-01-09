# Traditional Boilerplate: HTML5/Sass/Gulp/Webpack/Babel/PWA/Tests
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
* based on **Gulp**, **Yarn** and **Bower**
* friendly for Laravel-based applications

## Discover

### Installation


#### [Gulp](http://gulpjs.com)

Bring up a terminal and type `gulp --version`.
If Gulp is installed it should return a version number at or above 3.9.x.
If you need to install/upgrade Gulp, open up a terminal and type in the following:

```sh
$ npm install --global gulp
```

*This will install Gulp globally. Depending on your user account, you may need to [configure your system](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md) to install packages globally without administrative privileges.*

Next, install the local dependencies:

* ```npm install```

Note: if you have the [Yarn](https://yarnpkg.com/) package manager installed, you can just run `yarn`.

## Watch For Changes & Automatically Refresh Across Devices

```sh
$ gulp serve
```

This outputs an IP address you can use to locally test and another that can be used on devices
connected to your network.
`serve` does not use [service worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)
caching, so your site will stop being available when the web server stops running.

## Build & Optimize

```sh
$ gulp
```

Build and optimize the current project, ready for deployment.
This includes linting as well as image, script, stylesheet and HTML optimization and minification.
Also, a [service worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)
script will be automatically generated, which will take care of precaching your sites' resources.
On browsers that [support](https://jakearchibald.github.io/isserviceworkerready/) service
workers, the site will be loaded directly from the service worker cache, bypassing the server.
This means that this version of the site will work when the server isn't running or when there is
no network connectivity.

### Directory Structure: the most important elements

## The Bigger Picture Traditional Boilerplate Rules!
* Sass support - sorry is you are a Less fan, but we think Sass is the way right now
* after successfull developing just go with ```gulp``` and deploy!

By default we've added necessary files like robots.txt, basic icons (thanks to Google's Web Starter Kit), and Web Server Config in .htaccess to reach the highest performance (gzip, caching etc.).

Enjoy coding using the Bigger Picture Traditional Boilerplate!
