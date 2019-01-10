"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==_typeof(t)&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)e.d(o,r,function(e){return t[e]}.bind(null,r));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([,function(t,e,n){var o,r,i,a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},s="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t)};i=function c(){function t(t,e,n){var o=e._settings;!n&&i(t)||(O(o.callback_enter,t),k.indexOf(t.tagName)>-1&&(C(t,e),E(t,o.class_loading)),w(t,e),c(t),O(o.callback_set,t))}var e={elements_selector:"img",container:document,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",class_loading:"loading",class_loaded:"loaded",class_error:"error",load_delay:0,callback_load:null,callback_error:null,callback_set:null,callback_enter:null,callback_finish:null,to_webp:!1},n=function(t){return a({},e,t)},o=function(t,e){return t.getAttribute("data-"+e)},r=function(t,e,n){var o="data-"+e;null!==n?t.setAttribute(o,n):t.removeAttribute(o)},c=function(t){return r(t,"was-processed","true")},i=function(t){return"true"===o(t,"was-processed")},s=function(t,e){return r(t,"ll-timeout",e)},l=function(t){return o(t,"ll-timeout")},u=function(t,e){var n,o=new t(e);try{n=new CustomEvent("LazyLoad::Initialized",{detail:{instance:o}})}catch(t){(n=document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized",!1,!1,{instance:o})}window.dispatchEvent(n)},f=function(t,e){return e?t.replace(/\.(jpe?g|png)/gi,".webp"):t},d="undefined"!=typeof window,_=d&&!("onscroll"in window)||/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),b=d&&"IntersectionObserver"in window,p=d&&"classList"in document.createElement("p"),v=d&&function(){var t=document.createElement("canvas");return!(!t.getContext||!t.getContext("2d"))&&0===t.toDataURL("image/webp").indexOf("data:image/webp")}(),m=function(t,e,n,r){for(var i,a=0;i=t.children[a];a+=1)if("SOURCE"===i.tagName){var s=o(i,n);g(i,e,s,r)}},g=function(t,e,n,o){n&&t.setAttribute(e,f(n,o))},y=function(t,e){var n=v&&e.to_webp,r=o(t,e.data_src),i=o(t,e.data_bg);if(r){var a=f(r,n);t.style.backgroundImage='url("'+a+'")'}if(i){var s=f(i,n);t.style.backgroundImage=s}},h={IMG:function(t,e){var n=v&&e.to_webp,r=e.data_srcset,i=t.parentNode;i&&"PICTURE"===i.tagName&&m(i,"srcset",r,n);var a=o(t,e.data_sizes);g(t,"sizes",a);var s=o(t,r);g(t,"srcset",s,n);var c=o(t,e.data_src);g(t,"src",c,n)},IFRAME:function(t,e){var n=o(t,e.data_src);g(t,"src",n)},VIDEO:function(t,e){var n=e.data_src,r=o(t,n);m(t,"src",n),g(t,"src",r),t.load()}},w=function(t,e){var n=e._settings,o=t.tagName,r=h[o];return r?(r(t,n),e._updateLoadingCount(1),void(e._elements=function(t,e){return t.filter(function(t){return t!==e})}(e._elements,t))):void y(t,n)},E=function(t,e){p?t.classList.add(e):t.className+=(t.className?" ":"")+e},O=function(t,e){t&&t(e)},I=function(t,e,n){t.addEventListener(e,n)},S=function(t,e,n){t.removeEventListener(e,n)},L=function(t,e,n){S(t,"load",e),S(t,"loadeddata",e),S(t,"error",n)},x=function(t,e,n){var o=n._settings,r=e?o.class_loaded:o.class_error,i=e?o.callback_load:o.callback_error,a=t.target;!function(t,e){p?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\s+)"+e+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")}(a,o.class_loading),E(a,r),O(i,a),n._updateLoadingCount(-1)},C=function(t,e){var n=function r(n){x(n,!0,e),L(t,r,o)},o=function i(o){x(o,!1,e),L(t,n,i)};!function(t,e,n){I(t,"load",e),I(t,"loadeddata",e),I(t,"error",n)}(t,n,o)},k=["IMG","IFRAME","VIDEO"],j=function(e,n,o){t(e,o),n.unobserve(e)},A=function(t){var e=l(t);e&&(clearTimeout(e),s(t,null))},z=function(t){return t.isIntersecting||t.intersectionRatio>0},M=function(t,e){this._settings=n(t),this._setObserver(),this._loadingCount=0,this.update(e)};return M.prototype={_manageIntersection:function(t){var e=this._observer,n=this._settings.load_delay,o=t.target;n?z(t)?function(t,e,n){var o=n._settings.load_delay,r=l(t);r||(r=setTimeout(function(){j(t,e,n),A(t)},o),s(t,r))}(o,e,this):A(o):z(t)&&j(o,e,this)},_onIntersection:function(t){t.forEach(this._manageIntersection.bind(this))},_setObserver:function(){var t;b&&(this._observer=new IntersectionObserver(this._onIntersection.bind(this),{root:(t=this._settings).container===document?null:t.container,rootMargin:t.thresholds||t.threshold+"px"}))},_updateLoadingCount:function(t){this._loadingCount+=t,0===this._elements.length&&0===this._loadingCount&&O(this._settings.callback_finish)},update:function(t){var e=this,n=this._settings,o=t||n.container.querySelectorAll(n.elements_selector);this._elements=function(t){return t.filter(function(t){return!i(t)})}(Array.prototype.slice.call(o)),!_&&this._observer?this._elements.forEach(function(t){e._observer.observe(t)}):this.loadAll()},destroy:function(){var t=this;this._observer&&(this._elements.forEach(function(e){t._observer.unobserve(e)}),this._observer=null),this._elements=null,this._settings=null},load:function(e,n){t(e,this,n)},loadAll:function(){var t=this;this._elements.forEach(function(e){t.load(e)})}},d&&function(t,e){if(e)if(e.length)for(var n,o=0;n=e[o];o+=1)u(t,n);else u(t,e)}(M,window.lazyLoadOptions),M},"object"===s(e)&&void 0!==t?t.exports=i():void 0===(r="function"==typeof(o=i)?o.call(e,n,e,t):o)||(t.exports=r)}]);