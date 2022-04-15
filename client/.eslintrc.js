module.exports = {
    root: true,
    env: {
        es2021: true
    },
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'prettier'],
    parserOptions: {},
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-unused-vars':
            process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-empty-pattern':
            process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-undef': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
}
