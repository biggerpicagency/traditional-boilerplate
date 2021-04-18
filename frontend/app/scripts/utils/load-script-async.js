'use strict';

const loadScript = (src, callback) => {
    let s, r, t;
  
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.onload = s.onreadystatechange = function() {
      if ( !r && (!this.readyState || this.readyState === 'complete') ) {
        r = true;

        if (callback) {
          callback();
        }
      }
    };
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
};

export default loadScript;