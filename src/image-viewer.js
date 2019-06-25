
import template from './views/partials/image-viewer.dust';
var images = []; // mapped data of bound images
var thumbs = []; // bound image elements

// convert thumbnail alternate image into full naming
var getFullPath = path => path.replace('-thumb', '-full');

// bind all elements with class name to open in image viewer upon click
function bindImages(className) {
  // reset bound image data
  thumbs = document.querySelectorAll(className || '.thumbnail');
  images = [];

  // bing click event to thumbnail images
  thumbs.forEach(element => element.addEventListener('click', openViewer));
}

// opens corresponding other image on modal footer nav
function clickDotEvent(event) {
  // remove active state from all dots
  const otherImageDots = document.querySelectorAll('.image_other');
  otherImageDots.forEach(dot => dot.className = 'image_other');

  // set clicked dot to active and update preview src path
  const thisDot = event.toElement;
  thisDot.className = 'image_other active';
  const thisSrc = thisDot.getAttribute('data-src');
  document.querySelector('.image_preview').setAttribute('src', thisSrc);
}

// remove viewer elements and event listeners
function closeViewer(event) {
  // check for existing image viewer
  const openViewer = document.querySelector('div.image_viewer');
  if (openViewer) {
    // remove image viewer and keydown listener
    document.body.removeChild(openViewer);
    document.body.className = document.body.className.replace('image_viewer', '').trim();
    document.removeEventListener('keydown', keyDownEvent);
  }
}

// close and arrow navigation key binding
function keyDownEvent(event) {
  // only close on esc keydowns
  if (event.keyCode === 27) closeViewer(event);
  if (event.keyCode === 37) openPrevImage();
  if (event.keyCode === 39) openNextImage();
}

// navigate to next image dot
function openNextImage() {
  //TODO: get active dot, then activate next
}

// navigate to previous image dot
function openPrevImage() {
  //TODO: get active dot, then activate prior
}

// render and appends image viewer modal
function openViewer(event) {
  // prevents normal click action
  event.preventDefault();

  // get clicked images src path
  const clickedImg = event.toElement;
  let src = clickedImg.getAttribute('src');
  src = getFullPath(src);

  // opens full images in new tab if narrow viewport
  if (window.innerWidth < 1024) return window.open(src, '_blank');

  // sets clicked images matching dot active
  images = [...thumbs].map(thumb => {
    const thisSrc = getFullPath(thumb.getAttribute('src'));
    return {
      active: (thisSrc === src) || false,
      src: thisSrc,
    };
  });

  // generate elements from rendered html string
  dust.render(template, { src, images }, (err, html) => {
    // create elements from html string
    const div = document.createElement('div');
    div.innerHTML = html;
    const viewer = div.children[0];

    // bind close events to mask, x button, and esc keydown
    viewer.querySelector('.close_button').addEventListener('click', closeViewer);
    viewer.querySelector('.image_mask').addEventListener('click', closeViewer);
    document.addEventListener('keydown', keyDownEvent);

    // add image viewer to body
    document.body.appendChild(viewer);
    document.body.className = `${document.body.className} image_viewer`;

    // bind click event to all other image dots
    const otherImageDots = document.querySelectorAll('.image_other');
    otherImageDots.forEach(dot => dot.addEventListener('click', clickDotEvent));
  });
}

// expose image binding func
module.exports = { bindImages };
