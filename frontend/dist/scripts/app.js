"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(e){function t(t){for(var o,r,l=t[0],a=t[1],u=t[2],s=0,p=[];s<l.length;s++)r=l[s],i[r]&&p.push(i[r][0]),i[r]=0;for(o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o]);for(f&&f(t);p.length;)p.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,l=1;l<n.length;l++){var a=n[l];0!==i[a]&&(r=!1)}r&&(c.splice(t--,1),e=o(o.s=n[0]))}return e}function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}var r={},i={0:0},c=[];o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==_typeof(e)&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var l=window.webpackJsonp=window.webpackJsonp||[],a=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var f=a;c.push([3,3]),n()}({3:function(e,t,n){n.r(t);var o,r=n(0),i=n.n(r),c=function(){var e=window,t=document,n=t.documentElement,o=t.getElementsByTagName("body")[0];return{x:e.innerWidth||n.clientWidth||o.clientWidth,y:e.innerHeight||n.clientHeight||o.clientHeight}},l=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"html, body",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:80;if(c().x<768&&(n=60),i()(e).length){var o=i()(e).offset().top-n;i()(t).animate({scrollTop:o},1e3)}},a=function(){document.querySelectorAll('a[href^="#"]:not(.js-scroll-to)').forEach(function(e){e.addEventListener("click",function(){var e=this.hash,t=e.substr(e.indexOf("#"));return t.length&&l(t),!1})})};o=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)),"serviceWorker"in navigator&&("https:"===window.location.protocol||o)&&navigator.serviceWorker.register("/service-worker.js").then(function(e){e.onupdatefound=function(){if(navigator.serviceWorker.controller){var t=e.installing;t.onstatechange=function(){switch(t.state){case"installed":break;case"redundant":throw new Error("The installing service worker became redundant.")}}}}})["catch"](function(e){console.error("Error during service worker registration:",e)}),a(),i()("h1").html("Hello from app.js!")}});
//# sourceMappingURL=app.js.map
