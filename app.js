import { Viewer } from '@photo-sphere-viewer/core';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';

const baseUrl = 'https://photo-sphere-viewer-data.netlify.app/assets/';

const viewer = new Viewer({
    container: 'viewer',
    panorama: baseUrl + 'sphere.jpg',
    caption: 'Parc national du Mercantour <b>&copy; Damien Sorel</b>',

    plugins: [
        [MarkersPlugin, {
            markers: [{
                id: 'custom-tooltip',
                tooltip: {
                    content: document.querySelector('#tooltip-content').innerText,
                    className: 'custom-tooltip',
                    position: 'top',
                    trigger: 'click',
                },
                position: { pitch: 0.11, yaw: -0.35 },
                image: baseUrl + 'pictos/pin-blue.png',
                size: { width: 32, height: 32 },
                anchor: 'bottom center',
            }],
        }],
    ],
});

const markersPlugin = viewer.getPlugin(MarkersPlugin);

viewer.addEventListener('ready', () => {
    viewer
        .animate({
            yaw: 0,
            pitch: 0.5,
            speed: 1000,
        })
        .then(() => {
            markersPlugin.showMarkerTooltip('custom-tooltip');
        });
}, { once: true });