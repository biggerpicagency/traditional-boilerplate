'use strict';

import 'waypoints/lib/noframework.waypoints.min.js';
import isMobile from './is-mobile';

const apiKey = 'AIzaSyAanzKjF6LiHz-vILwxR2Tp_X4IFjeuVmo'; // please change to project API generated on Google Console
const styles = [];
const iconUrl = '';
const draggable = isMobile() ? false : true;

let mapOptions = {
    zoom: 15,
    disableDefaultUI: true,
    scrollwheel: false,
    draggable,
    styles    
};
let mapsScriptLoaded = false;

const executeMaps = () => {
    const maps = document.querySelectorAll('.js-map');
    let mapWaypoint;

    if (!maps) {
        return;
    }

    mapWaypoint = new Waypoint({
        element: maps[0],
        handler: function(direction) {
            if (direction === 'down') {
                if (!mapsScriptLoaded) {
                    let script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = `https://maps.googleapis.com/maps/api/js?v=3&key=${apiKey}&callback=loadMaps`;
                    document.body.appendChild(script);
                    mapsScriptLoaded = true;
                } else {
                    loadMaps();
                }
            }
        },
        offset: '80%'
    });
};

const loadMaps = (maps = document.querySelectorAll('.js-map')) => {
    [].forEach.call(maps, function(mapElement) {
        let myLatLngX = mapElement.getAttribute('data-latitude');
        let myLatLngY = mapElement.getAttribute('data-longitude');
        mapOptions.center = new google.maps.LatLng(myLatLngX, myLatLngY);
        mapOptions.zoomControlOptions = {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_TOP
        };

        let map = new google.maps.Map(mapElement, mapOptions);
        let marker = new google.maps.Marker({
            title: '',
            position: map.getCenter(),
            map,
            icon: {
                url: iconUrl,
                scaledSize: new google.maps.Size(50, 71)
            }
        });

        google.maps.event.addDomListener(window, 'resize', function() {
            let center = map.getCenter();
            google.maps.event.trigger(map, 'resize');
            map.setCenter(center);
        });
    });
};

window.loadMaps = loadMaps;

export default executeMaps;