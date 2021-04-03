module.exports = {
    env: {
        test: {
            sourceMaps: 'both'
        },
        production: {
            plugins: ['transform-react-remove-prop-types']
        }
    },
    presets: ['@babel/preset-env', '@babel/preset-react']
};
