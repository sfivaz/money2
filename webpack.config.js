const path = require('path');

module.exports = {
    mode: 'development',
    // devServer: {
    //     contentBase: path.join(__dirname, 'public'),
    //     port: 8080,
    //     host: `localhost`,
    // },
    entry: {
        home: ['./app/home.js'],
        account: ['./app/account.js'],
        category: ['./app/category.js'],
        login: ['./app/login.js'],
        register: ['./app/register.js']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/bundles/',
        filename: `[name].js`,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        'modules': 'false',//commonjs,amd,umd,systemjs,auto
                                        'useBuiltIns': 'usage',
                                        'targets': '> 0.25%, not dead',
                                        'corejs': 3
                                    }
                                ]
                            ]
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {}
    },
    plugins: [],
};
   