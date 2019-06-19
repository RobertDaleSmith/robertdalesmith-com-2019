'use-strict';

import template from './views/partials/image-viewer.dust';

function bindImages(className) {
  const thumbs = document.querySelectorAll(className || '.thumbnail');
  const getFullPath = path => path.replace('-thumb', '-full');

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

  function closeViewer(event) {
    // only close on esc keydowns
    if (event.type === 'keydown' && event.keyCode !== 27) return;

    // checks for existing image viewer
    const openViewer = document.querySelector('.image_viewer');
    if (openViewer) {
      // removes image viewer and keydown listener
      document.body.removeChild(openViewer);
      document.removeEventListener('keydown', closeViewer);
    }
  }

  function openViewer(event) {
    event.preventDefault();

    // get clicked images src path
    const clickedImg = event.toElement;
    let src = clickedImg.getAttribute('src');
    src = getFullPath(src);

    // opens full images in new tab if narrow viewport
    if (window.innerWidth < 1024) return window.open(src, '_blank');

    // sets clicked images matching dot active
    const images = [...thumbs].map(thumb => {
      const thisSrc = getFullPath(thumb.getAttribute('src'));
      return {
        active: (thisSrc === src) || undefined,
        src: thisSrc,
      };
    });

    // generate elements from rendered html string
    dust.render(template, { src, images }, (err, html) => {
      const div = document.createElement('div');
      div.innerHTML = html;
      const viewer = div.children[0];

      // bind clost events to mark, x button, and esc keydown
      viewer.querySelector('.close_button').addEventListener('click', closeViewer);
      viewer.querySelector('.image_mask').addEventListener('click', closeViewer);
      document.addEventListener('keydown', closeViewer);

      // add image viewer to body
      document.body.appendChild(viewer);

      // bind click event to all other image dots
      const otherImageDots = document.querySelectorAll('.image_other');
      otherImageDots.forEach(dot => dot.addEventListener('click', clickDotEvent));
    });
  }

  // bing click event to thumbnail images
  thumbs.forEach(element => element.addEventListener('click', openViewer));
}

module.exports = {
  bindImages,
};
