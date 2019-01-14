'use strict';

const eventTracking = () => {
    const links = document.querySelectorAll('a[data-type="trackEvent"]');
    
    links.forEach((link) => {
        link.addEventListener('click', function(event) {
            trackByGoogleAnalytics({link, event});
            // trackByGoogleTagManager({link, event})
        }, false);
    });
};

/* 
 * tracking events by Google Analytics
 * 
*/
const trackByGoogleAnalytics = ({link, event}) => {
    const ga = window.ga || null;
    if (!ga) {
        return true;
    }

    let data = {
        'hitType': 'event',
        'eventCategory': link.dataset.category || '',
        'eventAction':  link.dataset.action || '',
        'eventLabel':  link.dataset.label || ''
    };

    if (link.dataset.value) {
        data.eventValue = link.dataset.value;
    }

    if (link.getAttribute('target') !== '_blank' && !link.classList.contains('js-')) {
        data.hitCallback = function() {
            window.location = link.getAttribute('href');
        };
    }

    if (data.eventCategory || data.eventAction || data.eventLabel) {
        ga('send', data);
    }

    return data.hitCallback ? event.preventDefault() : true;
};

/* 
 * tracking events by Google Tag Manager (needs to be adjusted following your GTM settings)
 * 
*/
/*
const trackByGoogleTagManager = ({link, event}) => {
    const gtmDataLayer = window.dataLayer || null;
    let url = link.getAttribute('href');
        
    window.dataLayer.push({
        'event': 'button-click',
        'url': url
    });
};
*/

export default eventTracking;