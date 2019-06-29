
// import dust page templates
import homeTemplate from './views/home.dust';
import bounTemplate from './views/work-bouncingpixel.dust';
import moteTemplate from './views/work-motelabs.dust';
import sumoTemplate from './views/work-sumo.dust';

// define page routes data
var routes = {
  '/': {
    base: '/',
    template: homeTemplate,
    title: 'Developer',
    type: 'home'
  },
  '/work/bouncing-pixel/': {
    base: '../../',
    template: bounTemplate,
    title: 'Bouncing Pixel',
    type: 'work'
  },
  '/work/mote-labs/': {
    base: '../../',
    template: moteTemplate,
    title: 'Mote Labs',
    type: 'work'
  },
  '/work/sumo/': {
    base: '../../',
    template: sumoTemplate,
    title: 'Sumo.com',
    type: 'work'
  },
};

// expose routes data
module.exports = routes;
