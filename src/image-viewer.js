'use-strict';

import template from './views/partials/image-viewer.dust';

function bindImages(className) {
  document.querySelectorAll(className || '.thumbnail').forEach(element => {
    // bing click event to thumbnail images
    element.addEventListener('click', event => {
      event.preventDefault();

      // get full image path from clicked thumbnail
      var src = element.getAttribute('src') || '';
      src = src.replace('-thumb', '-full');

      // opens full images in new tab if narrow viewport
      if (window.innerWidth < 1024) {
        return window.open(src, '_blank');
      }

      dust.render(template, { src }, (err, result) => {
        // generate elements from rendered html string
        const div = document.createElement('div');
        div.innerHTML = result;
        const viewerElement = div.children[0];

        const closeEvent = e => {
          // only close on esc keydowns
          if (e.type === 'keydown' && e.keyCode !== 27) return;

          // checks for existing image viewer
          const openViewer = document.querySelector('.image_viewer');
          if (openViewer) {
            // removes image viewer and keydown listener
            document.body.removeChild(openViewer);
            document.removeEventListener('keydown', closeEvent);
          }
        };

        // bind clost events to mark, x button, and esc keydown
        viewerElement.querySelector('.close_button').addEventListener('click', closeEvent);
        viewerElement.querySelector('.image_mask').addEventListener('click', closeEvent);
        document.addEventListener('keydown', closeEvent);

        // add image viewer to body
        document.body.appendChild(viewerElement);
      });
    });
  });
}

module.exports = {
  bindImages,
};
