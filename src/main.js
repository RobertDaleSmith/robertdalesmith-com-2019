
// load main style sheet
import style from './style/main.scss';

// bind all images for viewer
import viewer from './image-viewer.js';
viewer.bindImages('.thumbnail');

// bind page links for single page load
import pages from './pages.js';
pages.init();
