
var GA_TRACKING_ID = 'UA-31879246-1';
var devMode = process.env.NODE_ENV !== 'production';

// google analytics data event layer
function gtag(){
  window.dataLayer = window.dataLayer || [];
  dataLayer.push(arguments);
}

// initializes google analytics tracking
function init() {
  if (devMode) return;

  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID);
}

// sends page view event for path
function pageView(pagePath) {
  if (devMode) return;

  gtag('send', 'pageview', pagePath);
  gtag('config', GA_TRACKING_ID, { 'page_path': pagePath });
}

// exposes initialize and page view func
module.exports = { init, pageView };
