'use-strict';

import ga from './google-analytics.js';
import viewer from './image-viewer.js';

// define page routes
import routes from './routes.js';

function renderContent(template, callback) {
  // render routes template content to html
  dust.render(template, { base: '../../', content: true }, function(err, result) {
    if (err) return console.log(err);
    callback(result);
  });
}

function loadPage(href, history) {
  const pathName = getPathName(href);
  const { template, title, type } = routes[pathName];

  renderContent(template, function(html) {

    // update the page title
    const pageTitle = `Robert Dale Smith | ${title}`;

    // update history state and pathName
    if (!history) window.history.pushState({ pathName, pageTitle }, pageTitle, `${pathName}`);

    document.title = pageTitle;

    // update content html
    document.querySelector('.content').innerHTML = html;

    // scroll to top of page/content
    if (!history) {
      if (pathName === '/') {
        document.scrollingElement.scrollTo(0, 0);
      } else {
        const y = document.querySelector('.content').offsetTop;
        document.scrollingElement.scrollTo(0, y - 24);
      }
    }

    // sets page type class
    document.querySelector('.page').className = `page ${type}`;

    // binds new viewer images
    viewer.bindImages('.thumbnail');

    // binds new page links
    bindLinks();

    ga.pageView(pathName);
  });
}

function getPathName(href) {
  let path = href;

  // must be home root
  if (path && path.replace(/\.\.\//g,'') === "") path = '/';
  
  // most start with slash
  if (path[0] !== '/') path = `/${path}`;

  return path;
}

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
    link.addEventListener('click', function(e) {
      e.preventDefault();
      loadPage(pathName);
    });

    // flag has been bound
    link.setAttribute('linked', '');
  });
}

function init() {

  // bail if not supported
  if (!window.history || !window.history.pushState) return;

  // replace initial state
  window.history.replaceState({
    pathName: window.location.pathname,
    pageTitle: document.title
  },
    document.title,
    window.location.pathname
  );

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

module.exports = { init };
