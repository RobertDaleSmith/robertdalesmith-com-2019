
var GA_TRACKING_ID = 'UA-31879246-1';

function gtag(){
  window.dataLayer = window.dataLayer || [];
  dataLayer.push(arguments);
}

function init() {
  if (process.env.NODE_ENV !== 'production') return;

  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID);
}

function pageView(pagePath) {
  if (process.env.NODE_ENV !== 'production') return;

  gtag('send', 'pageview', pagePath);
  gtag('config', GA_TRACKING_ID, { 'page_path': pagePath });
}

module.exports = { init, pageView };
