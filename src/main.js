
// load main style sheet
import style from './style/main.scss';

// bind all images for viewer
import viewer from './image-viewer.js';
viewer.bindImages('.thumbnail');

// initialize google analytics
import ga from './google-analytics.js';
ga.init();
