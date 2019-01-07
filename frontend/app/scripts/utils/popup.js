'use strict';

import 'magnific-popup';
import $ from 'jquery';

export default () => {
    $('a.js-popup, a.popup, a.js-video').on('click', function() {
        var href = $(this).attr('href'),
            type = href.substring(href.length-4, href.length),
            title = $(this).attr('title');

            if (type === '.jpg' || type === '.gif' || type === '.png' || type === '.jpeg') {
                type = 'image';
            } else {
                type = 'iframe';
            }

            $.magnificPopup.open({
                items: {
                    src: href
                },
                type: type,

                image: {
                    markup: '<div class="mfp-figure">'+
                            '<div class="mfp-img"></div>'+
                            '<div class="mfp-bottom-bar">'+
                                '<div class="mfp-title"></div>'+
                                '<div class="mfp-counter"></div>'+
                                '<p class="mfp-close"></p>'+
                            '</div>'+
                            '<p class="mfp-close"></p>'+
                            '</div>',

                    cursor: 'mfp-zoom-out-cur',
                    titleSrc: title,
                    verticalFit: true, // Fits image in area vertically
                    tError: '<a href="%url%">The image</a> could not be loaded.' // Error message
                },

                iframe: {
                    patterns: {
                        youtube: {
                            index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).
                            id: 'v=', // String that splits URL in a two parts, second part should be %id%
                            src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0' // URL that will be set as a source for iframe.
                        }
                    }
                },
                //closeMarkup: '<a class="mfp-close btn btn--gold">CLOSE</a>',

                mainClass: 'mfp-fade',
                titleSrc: title,
                gallery: {
                    enabled: true,
                    navigateByImgClick: true
                }
            });

        return false;
    });

    return;
};