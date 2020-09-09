module.exports = {
  'env': {
    'commonjs': true,
    'es2021': true,
    'node': true,
  },
  'plugins': ['promise'],
  'extends': [
    'google',
    'plugin:promise/recommended',
  ],
  'parserOptions': {
    'ecmaVersion': 12,
  },
  'rules': {
  },
};
