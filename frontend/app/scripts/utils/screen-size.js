'use strict';

const screenSize = () => {
    const w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth|| e.clientWidth|| g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight,
        sizes = {x, y};

    return sizes;
};

export default screenSize;