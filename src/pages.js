
var ga = require('./google-analytics.js');
var viewer = require('./image-viewer.js');
var routes = require('./routes.js');

// bind page class links with known local routes
function bindLinks() {
  const links = document.querySelectorAll('a.page');
  links.forEach(link => {
    const linked = link.hasAttribute('linked');
    const href = link.getAttribute('href');
    const pathName = getPathName(href);

    // bail on already bound
    if (linked) return;

    // bail out if not defined route
    if (routes[pathName] === undefined) return;

    // bind click event
    link.addEventListener('click', e => {
      e.preventDefault();
      loadPage(pathName);
    });

    // flag has been bound
    link.setAttribute('linked', '');
  });
}

// return absolute path
function getPathName(href) {
  let path = href;

  // must be home root
  if (path && path.replace(/\.\.\//g,'') === "") path = '/';
  
  // most start with slash
  if (path[0] !== '/') path = `/${path}`;

  return path;
}

// init custom SPA page loader
function init() {

  // bail if not supported
  if (!window.history || !window.history.pushState) return;

  // replace initial state
  window.history.replaceState({
    pathName: window.location.pathname,
    pageTitle: document.title
  }, document.title, window.location.href);

  // listen for browser back/forward
  window.onpopstate = function(event) {
    const { state } = event;
    if (state && state.pathName) {
      loadPage(getPathName(state.pathName), true);
    }
  };

  // initialize google analytics
  ga.init();

  // bind all page links
  bindLinks();
}

// load page based on href
function loadPage(href, history) {
  const pathName = getPathName(href);
  const { template, title, type } = routes[pathName];

  // already here, nothing to do
  if (!history && pathName === window.location.pathname) return;

  // render page content html
  renderContent(template, html => {

    // get full page title string
    const pageTitle = `Robert Dale Smith | ${title}`;

    // update history state only on loads not coming from browser back/forward
    if (!history) window.history.pushState({ pathName, pageTitle }, pageTitle, `${pathName}`);

    // update the page title
    document.title = pageTitle;

    // update content html
    document.querySelector('.content').innerHTML = html;

    // scroll to top of page/content
    if (!history) {
      if (pathName === '/') {
        // scrolls to top of home page
        document.scrollingElement.scrollTo(0, 0);
      } else {
        // scrolls to top of new page content and offset a bit
        const y = document.querySelector('.content').offsetTop;
        document.scrollingElement.scrollTo(0, y - 24);
      }
    }

    // set page type class
    document.querySelector('.page').className = `page ${type}`;

    // bind new viewer images
    viewer.bindImages('.thumbnail');

    // bind new page links
    bindLinks();

    // track page view
    ga.pageView(pathName);
  });
}

// render page content and returns html string through callback
function renderContent(template, callback) {
  // render routes template content to html
  dust.render(template, { base: '../../', content: true }, (err, result) => {
    if (err) return console.log(err);
    callback(result);
  });
}

// expose initialize func
module.exports = { init };
