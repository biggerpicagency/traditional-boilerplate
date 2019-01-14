'use strict';

/* jshint ignore:start */
import 'waypoints/lib/noframework.waypoints.min.js';

const animatedSections = () => {
    const animation = {
        runAnimation: function(section, animClassName) {
            const splittedAnimClassName = animClassName.split('-');

            setTimeout(function() {
                section.classList.remove(animClassName);
            }, 1200);
            section.classList.add('animated');
            section.classList.add(splittedAnimClassName[1]);
            section.classList.add('active');
        }
    };
    const offSetSlider = '85%';
    let items;
    let section;
    const animationClassTable = ['animation-fadeInUp'];
    let i = 0;

    for (i = 0; i < animationClassTable.length; i++) {
        let dotClassName = `.${animationClassTable[i]}`,
            className = animationClassTable[i];
        
        if (document.querySelector(dotClassName)) {
            items = document.querySelectorAll(dotClassName);

            [].forEach.call(items, function(item) {
                section = new Waypoint({
                    element: item,
                    handler: function(direction) {
                        if (direction === 'down') {
                            animation.runAnimation( item, className );
                            this.destroy();
                        }
                    },
                    offset: offSetSlider
                });
            });
        }
    }
};

export default animatedSections;
/* jshint ignore:end */