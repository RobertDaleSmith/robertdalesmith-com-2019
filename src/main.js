
var pages = require('./pages.js');
var error = require('./404.js');
var viewer = require('./image-viewer.js');

// load main style sheets
import style from './style/main.scss';

// bind all images for viewer
viewer.bindImages('.thumbnail');

// bind page links for SPA loading
pages.init();
