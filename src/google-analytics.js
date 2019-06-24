'use-strict';

function gtag(){
  window.dataLayer = window.dataLayer || [];
  dataLayer.push(arguments);
}

function init() {
  if (process.env.NODE_ENV !== 'production') return;

  gtag('js', new Date());
  gtag('config', 'UA-31879246-1');
}

module.exports = { init };
