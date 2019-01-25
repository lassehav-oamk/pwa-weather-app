const path = require('path');
//const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    devtool: false,//'eval-source-map',
    entry: ['@babel/polyfill', './src/main.js'],
    output: {
        filename: 'bundle.js',        
        path: path.resolve(__dirname, 'public/js')        
    },
    mode: "development",
    watch: true,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                            importLoaders: 1
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        /*new WorkboxPlugin.InjectManifest({
            swSrc: './public/service-worker.js',
        })*/
        //new webpack.HotModuleReplacementPlugin()
    ],
    /*
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        hot: true,
        port: 8000
    }*/
};