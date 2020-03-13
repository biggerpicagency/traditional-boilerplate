'use strict';

import { trackVisit } from './track-event';

let pushStateCounter = 0;
const getCurrentCategorySlug = () => {
    return document.querySelector('[data-filter-category]').getAttribute('data-filter-category');
};

const adjustParamsInUrl = ({url}) => {
    if (url.indexOf('.html') > -1) {
        return url;
    }

    if (url.indexOf('?') > -1) {
        url += '/'; 
    } else {
        url += '/?';
    }

    return url + Math.random();
};

const loadContent = ({url, callback}) => {
    let loadingLayer = document.querySelector('.loading');
    loadingLayer.classList.add('loading--active');

    if (url.slice(-1) === '/') {
        url = url.slice(0, -1);
    }

    const newUrl = adjustParamsInUrl({url});

    // init the request
    let request = new XMLHttpRequest();

    request.open('GET', newUrl, true);
    request.setRequestHeader('Content-Type', 'text/html; charset=UTF-8');
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    request.onload = function() {
        loadingLayer.classList.remove('loading--active');
        let refinedContent = document.querySelector('#js-refined-content');

        if (request.status === 200) {
            let response = request.response;

            // replace current #js-refined-content with new content
            let newRefinedContentElement = document.createElement('div');
            newRefinedContentElement.setAttribute('id', 'js-refined-content');
            
            newRefinedContentElement.innerHTML = response;
            refinedContent.parentNode.replaceChild(newRefinedContentElement, refinedContent);

            // execute scripts if exist in the new content for the dynamic meta title/description load
            let jsScript = document.querySelector('#js-meta-tags');

            if (jsScript) {
                eval(jsScript.text);

                document.title = window.App.metaTags.title;
                document.querySelector('meta[name=description]').setAttribute('content', window.App.metaTags.description);
            } else {
                console.error('No script specified means no dynamic title loading');
            }

            // run scripts from callback if exists
            if (callback) {
                callback();
            }
        } else {
            let errorMessage = document.createElement("div");
            errorMessage.classList.add('response');
            errorMessage.classList.add('response--error');
            errorMessage.innerHTML = '<p>Error while loading the content.</p>';

            refinedContent.appendChild(errorMessage);
            refinedContent.insertBefore(errorMessage, refinedContent.firstChild);
        }
    };

    // send the request
    request.send();
};

const refine = ({type, url, callback}) => {
    const categorySlug = getCurrentCategorySlug();

    if (type === 'label') {
        url = `${categorySlug}/${url}`;
    }

    trackVisit({url});
    history.pushState({url}, null, url);
    pushStateCounter++;
    loadContent({url, callback});
};

export function initRefinement() {
    window.addEventListener('popstate', function(e) {
        let character = e.state;

        if (character && character.url) {
            loadContent({url: character.url, callback: App.scriptsAsCallback});
        } else if (character === null) {
            location.reload();
        }
    });
}

export default refine;