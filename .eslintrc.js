module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },

  env: {
    browser: true
  },

  extends: [
    'plugin:vue/essential', //  Priority A
    // 'plugin:vue/strongly-recommended', //  Priority B
    // 'plugin:vue/recommended', //  Priority C
    'standard'
  ],

  plugins: [
    'vue'
  ],

  rules: {
  }
}
