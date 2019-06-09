// @RobertDaleSmith
'use-strict';

// dependencies
const fs = require('fs');
const path = require('path');
const dust = require('dustjs-linkedin');
const { getOptions } = require('loader-utils');


// Main loader function
async function loader(source) {

  // dust files don't have side effects, so loader results are cacheable
  if (this.cacheable) this.cacheable();

  // Set up default options & override them with other options
  const default_options = {
    root: '',
    preserveWhitespace: false,
    preLoader: false
  };

  // get user supplied loader options from `this.query`
  const loader_options = getOptions(this) || {};

  // merge user options with default options
  const options = Object.assign({}, default_options, loader_options);

  // Fix slashes & resolve root
  if (options.root) options.root = path.resolve(options.root.replace('/', path.sep));

  if (typeof options === "string" && options.indexOf('preserveWhitespace') > -1) {
    dust.config.whitespace = true;
  }

  if (options['preserveWhitespace']) {
    dust.config.whitespace = true;
  }

  const context = this.context || this.rootContext;

  const name = this.resourcePath
    .replace(context + path.sep, '')
    .replace('.dust', '')
    .split(path.sep)
    .join('/');

  // Get the path
  const template_path = (options.root || context) + path.sep;

  // Find regular dust partials, updating the source as needed for relatively-pathed partials
  source = findPartials(source, template_path, options);

  // Compile the template
  const compiled = dust.compile(source, name);
  dust.loadSource(compiled);

  // Render the template
  const rendered = await new Promise(function(resolve, reject) {
    dust.render(name, options, function(err, result) {
      if(err) console.log(err);
      resolve(result);
    });
  });

  if (options.preLoader) return rendered;

  return "module.exports = `" + rendered.replace(/\`/g, "\\\`") + "`";
}

// Find and Compile DustJS partials
function findPartials(source, source_path) {
  const reg = /({>\s?")([^"{}]+)("[\s\S]*?\/})/g; // matches dust partial syntax
  let result = null;

  // search source & add a dependency for each match
  while ((result = reg.exec(source)) !== null) {
    const partial = { name: result[2] };

    // grab partial source
    partial.path = path.resolve(source_path, partial.name+".dust");
    partial.source = fs.readFileSync(partial.path, 'utf8');

    // compile and cache partial
    const compiled = dust.compile(partial.source, partial.name);
    dust.loadSource(compiled);
  }

  return source;
}

// Export actual loader method
module.exports = loader;
