const isTest = String(process.env.NODE_ENV) === 'test'
module.exports = {
  presets: [["@babel/env", { modules: isTest ? 'commonjs' : false }, "@babel/react"]],
  plugins: [
    'syntax-dynamic-import',
    'transform-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
}