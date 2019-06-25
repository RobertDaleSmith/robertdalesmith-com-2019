RobertDaleSmith.com 2019
==========
The latest interation on my personal website. Primarily built this around highlighting some of my most recent development work.

Wanting to stick with an inexpensive apache hosting package and to keep the website basic. I put together a webpack config that builds and outputs a static HTML website from sass and dustjs templates.

### Dependencies
- [webpack](https://github.com/webpack) with [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
- [dustjs](https://www.dustjs.com/) for rendering HTML templates
- [sass-loader](https://github.com/webpack-contrib/sass-loader) for building style sheets
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server) for Hot Module Replacement (HMR)


### Build for production
```
npm run build
```
Successful compilation will output to `./build` directory.


### Start HMR dev server 
```
npm start
```
