"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(e){function t(t){for(var r,o,l=t[0],s=t[1],c=t[2],d=0,p=[];d<l.length;d++)o=l[d],a[o]&&p.push(a[o][0]),a[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(u&&u(t);p.length;)p.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,l=1;l<n.length;l++){var s=n[l];0!==a[s]&&(o=!1)}o&&(i.splice(t--,1),e=r(r.s=n[0]))}return e}function r(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}var o={},a={0:0},i=[];r.m=e,r.c=o,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==_typeof(e)&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var l=window.webpackJsonp=window.webpackJsonp||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var u=s;i.push([8,3]),n()}([,function(e,t,n){function r(e){var t=e.url;"ga"===o?void 0!==window.ga&&window.ga("send","pageview",t):i({url:t})}n.d(t,"b",function(){return r});var o="gtm",a=function(e){var t=e.link,n=e.event;if(void 0===window.ga)return!0;var r={hitType:"event",eventCategory:t.dataset.category||"",eventAction:t.dataset.action||"",eventLabel:t.dataset.label||""};return t.dataset.value&&(r.eventValue=t.dataset.value),"_blank"===t.getAttribute("target")||t.classList.contains("js-")||(r.hitCallback=function(){window.location=t.getAttribute("href")}),(r.eventCategory||r.eventAction||r.eventLabel)&&window.ga("send",r),!r.hitCallback||!n||n.preventDefault()},i=function(e){var t=e.link,n=void 0===t?null:t,r=e.url,o=void 0===r?null:r,a=e.event,i=void 0===a?"page-visit":a,l=window.dataLayer||[];n&&(o=n.getAttribute("href")),l.push({event:i,url:o})};t.a=function(){document.querySelectorAll('a[data-type="trackEvent"]').forEach(function(e){e.addEventListener("click",function(t){"ga"===o?a({link:e,event:t}):i({link:e,event:"buttonClick"})},!1)})}},function(module,__webpack_exports__,__webpack_require__){function initRefinement(){window.addEventListener("popstate",function(e){var t=e.state;t&&t.url?loadContent({url:t.url,callback:App.scriptsAsCallback}):null===t&&location.reload()})}__webpack_require__.d(__webpack_exports__,"b",function(){return initRefinement});var _track_event__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1),pushStateCounter=0,getCurrentCategorySlug=function(){return document.querySelector("[data-filter-category]").getAttribute("data-filter-category")},adjustParamsInUrl=function(e){var t=e.url;return t.indexOf(".html")>-1?t:(t+=t.indexOf("?")>-1?"/":"/?",t+Math.random())},loadContent=function loadContent(_ref5){var url=_ref5.url,callback=_ref5.callback,loadingLayer=document.querySelector(".loading");loadingLayer.classList.add("loading--active"),"/"===url.slice(-1)&&(url=url.slice(0,-1));var newUrl=adjustParamsInUrl({url:url}),request=new XMLHttpRequest;request.open("GET",newUrl,!0),request.setRequestHeader("Content-Type","text/html; charset=UTF-8"),request.onload=function(){loadingLayer.classList.remove("loading--active");var refinedContent=document.querySelector("#js-refined-content");if(200===request.status){var response=request.response,newRefinedContentElement=document.createElement("div");newRefinedContentElement.setAttribute("id","js-refined-content"),newRefinedContentElement.innerHTML=response,refinedContent.parentNode.replaceChild(newRefinedContentElement,refinedContent);var jsScript=document.querySelector("#js-meta-tags");jsScript?(eval(jsScript.text),document.title=window.App.metaTags.title,document.querySelector("meta[name=description]").setAttribute("content",window.App.metaTags.description)):console.error("No script specified means no dynamic title loading"),callback&&callback()}else{var e=document.createElement("div");e.classList.add("response"),e.classList.add("response--error"),e.innerHTML="<p>Error while loading the content.</p>",refinedContent.appendChild(e),refinedContent.insertBefore(e,refinedContent.firstChild)}},request.send()},refine=function(e){var t=e.type,n=e.url,r=e.callback,o=getCurrentCategorySlug();"label"===t&&(n="".concat(o,"/").concat(n)),Object(_track_event__WEBPACK_IMPORTED_MODULE_0__.b)({url:n}),history.pushState({url:n},null,n),pushStateCounter++,loadContent({url:n,callback:r})};__webpack_exports__.a=refine},,,function(e,t,n){"NodeList"in window&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(e,t){t=t||window;for(var n=0;n<this.length;n++)e.call(t,this[n],n,this)})},,,function(e,t,n){n.r(t),n(3);var r=n(0),o=n.n(r),a=function(){var e=window,t=document,n=t.documentElement,r=t.getElementsByTagName("body")[0];return{x:e.innerWidth||n.clientWidth||r.clientWidth,y:e.innerHeight||n.clientHeight||r.clientHeight}},i=function(e){var t=e.id,n=e.context,r=void 0===n?"html, body":n,i=e.offSet,l=void 0===i?80:i;if(a().x<768&&(l=60),o()(t).length){var s=o()(t).offset().top-l;o()(r).animate({scrollTop:s},1e3)}},l=function(){document.querySelectorAll('a[href^="#"]:not(.js-scroll-to)').forEach(function(e){e.addEventListener("click",function(){var e=this.hash,t=e.substr(e.indexOf("#"));return t.length&&i({id:t}),!1})})},s=function(){var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(e,"px"))},c=n(1),u=function(e){var t=e.form,n=e.url,r=o()(t).serialize(),a=t.querySelector(".loading"),i=t.querySelector('button[type="submit"]'),l=function(e){var t=e.elementHtml,n=e.parent,r=document.createElement("div");r.innerHTML=t,n.insertBefore(r,n.firstChild)};a.classList.add("loading--active"),i.textContent="Sending...";var s=new XMLHttpRequest;return s.open("POST",n,!0),s.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),s.onload=function(){if(s.status>=200&&s.status<400){var e=JSON.parse(s.response);i.textContent="Submit",a.classList.remove("loading--active"),e.url?window.location.href=e.url:(a.classList.remove("loading--active"),t.querySelectorAll(".response--success").length?t.querySelector(".response--success p").textContent=e.message:l({elementHtml:'<div class="response response--success"><p>'.concat(e.message,"</p></div>"),parent:t}));var n=t.querySelector(".response--error");n&&n.parentNode.removeChild(n),t.reset()}else{var r="",o=s.response;if(404!==s.status&&(o=JSON.parse(s.response)),422===s.status)for(var c in o)o.hasOwnProperty(c)&&(r+=o[c].join("<br>")+"<br>");else 404===s.status?r="Page not found - incorrect url.":o.message&&(r=o.message);r&&(t.querySelectorAll(".response--error").length?t.querySelector(".response--error p").textContent=r:l({elementHtml:'<div class="response response--error"><p>'.concat(r,"</p></div>"),parent:t}));var u=t.querySelector(".response--success");u&&u.parentNode.removeChild(u),i.textContent="Submit",a.classList.remove("loading--active")}},s.send(r),!1};n(4);var d={zoom:15,disableDefaultUI:!0,scrollwheel:!1,draggable:!function(){try{return document.createEvent("TouchEvent"),!0}catch(e){return!1}}(),styles:[]},p=!1,f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.querySelectorAll(".js-map");[].forEach.call(e,function(e){var t=e.getAttribute("data-latitude"),n=e.getAttribute("data-longitude");d.center=new google.maps.LatLng(t,n),d.zoomControlOptions={style:google.maps.ZoomControlStyle.LARGE,position:google.maps.ControlPosition.RIGHT_TOP};var r=new google.maps.Map(e,d);new google.maps.Marker({title:"",position:r.getCenter(),map:r,icon:{url:"",scaledSize:new google.maps.Size(50,71)}}),google.maps.event.addDomListener(window,"resize",function(){var e=r.getCenter();google.maps.event.trigger(r,"resize"),r.setCenter(e)})})};window.loadMaps=f;var v,m=function(){var e,t=document.querySelectorAll(".js-map");t.length&&(e=new Waypoint({element:t[0],handler:function(e){if("down"===e)if(p)f();else{var t=document.createElement("script");t.type="text/javascript",t.src="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyAanzKjF6LiHz-vILwxR2Tp_X4IFjeuVmo&callback=loadMaps",document.body.appendChild(t),p=!0}},offset:"80%"}))},g=n(2);v=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)),"serviceWorker"in navigator&&("https:"===window.location.protocol||v)&&navigator.serviceWorker.register("/service-worker.js").then(function(e){e.onupdatefound=function(){if(navigator.serviceWorker.controller){var t=e.installing;t.onstatechange=function(){switch(t.state){case"installed":break;case"redundant":throw new Error("The installing service worker became redundant.")}}}}})["catch"](function(e){console.error("Error during service worker registration:",e)}),n(5),s(),l(),Object(c.a)(),m(),Object(g.b)(),console.log("run your component scripts from runWebsiteScripts() method"),window.App={metaTags:{},submitForm:u,refine:g.a,scriptsAsCallback:function(){console.log("run scripts as callback")}}}]);