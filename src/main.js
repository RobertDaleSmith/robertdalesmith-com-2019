import style from './style/main.scss';

var imageViewer = require('./views/partials/image-viewer.dust');

document.querySelectorAll('.thumbnail').forEach(element => {
  element.addEventListener("click", event => {
    event.preventDefault();

    var src = element.getAttribute('src') || '';
    src = src.replace('-thumb', '-full');

    if (window.innerWidth < 1024) {
      window.open(src, '_blank');
      return;
    }

    dust.render(imageViewer, { src }, (err, result) => {
      var div = document.createElement('div');
      div.innerHTML = result;
      var viewer = div.children[0];

      var closeEvent = e => document.body.removeChild(viewer);
      viewer.querySelector('.close_button').addEventListener("click", closeEvent);
      viewer.querySelector('.image_mask').addEventListener("click", closeEvent);

      document.body.appendChild(viewer);
    });
  });
})
