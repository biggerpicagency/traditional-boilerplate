'use strict';

let BP_BOILERPLATE = BP_BOILERPLATE || {};
let UTILS = UTILS || {};

BP_BOILERPLATE.utils = UTILS || {};


UTILS.sum = function sum(a, b) {
    return a + b;
}

console.log(BP_BOILERPLATE.utils);
console.log(BP_BOILERPLATE.utils.sum(2,4));
console.log(BP_BOILERPLATE.utils.screenSize());

BP_BOILERPLATE.utils.sum(2,4)
BP_BOILERPLATE.utils.hashAnchorClick();
BP_BOILERPLATE.utils.animationedSections();
BP_BOILERPLATE.utils.openPopupOnClick();
BP_BOILERPLATE.utils.magnific();
