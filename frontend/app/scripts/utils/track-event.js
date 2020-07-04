'use strict';

const TRACKING_TYPE = 'gtm'; // ga OR gtm
const eventTracking = () => {
    const links = document.querySelectorAll('a[data-type="trackEvent"]');
    
    links.forEach((link) => {
        link.addEventListener('click', function(event) {
            if (TRACKING_TYPE === 'ga') {
                trackByGoogleAnalytics({link, event});
            } else {
                trackByGoogleTagManager({link, event: 'buttonClick'});
            }
        }, false);
    });
};

/* 
 * tracking events by Google Analytics
 * 
*/
const trackByGoogleAnalytics = ({link, event}) => {
    if (window.ga === undefined) {
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
        window.ga('send', data);
    }

    return data.hitCallback && event ? event.preventDefault() : true;
};

/* 
 * tracking events by Google Tag Manager (needs to be adjusted following your GTM settings)
 * 
*/
const trackByGoogleTagManager = ({link = null, url = null, event = 'page-visit'}) => {
    const gtmDataLayer = window.dataLayer || [];
    let data = {
        event,
        url
    }

    if (event === 'buttonClick') {
        data['event-tracking-category'] = link.getAttribute('data-category') ? link.getAttribute('data-category') : '';
        data['event-tracking-action'] = link.getAttribute('data-action') ? link.getAttribute('data-action') : '';
        data['event-tracking-label'] = link.getAttribute('data-label') ? link.getAttribute('data-label') : '';
        data['event-tracking-value'] = link.getAttribute('data-value') ? link.getAttribute('data-value') : '';
    }

    if (link) {
        data.url = link.getAttribute('href');
    }
        
    gtmDataLayer.push(data);
};

export default eventTracking;
export function trackVisit({url, isFirstVisit = false}) {
    if (TRACKING_TYPE === 'ga') {
        if (!window.ga) {
            return;
        }

        window.ga('send', 'pageview', url);

    } else {
        if (!window.dataLayer) {
            return;
        }

        if (isFirstVisit) {
            window.dataLayer.push({
                originalLocation: document.location.protocol + '//' +
                                  document.location.hostname +
                                  document.location.pathname +
                                  document.location.search
              });
        }

        trackByGoogleTagManager({url});
    }
}