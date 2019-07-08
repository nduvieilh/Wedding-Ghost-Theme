const path = require('path');

// module.exports = {
//     entry: './src/index.js',
//     output: {
//         filename: 'main.js',
//         path: path.resolve(__dirname, 'assets/built')
//     }
// }

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'assets/build')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        ///...
        new MiniCssExtractPlugin({
            filename: '[name].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.s(a|c)ss$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins: function () { // post css plugins, can be exported to postcss.config.js
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    
                ]
            },
            // {
            //     test: /\.scss$/,
            //     use: [
            //         { loader: 'style-loader' },
            //         {
            //             loader: 'css-loader', options: {
            //                 sourceMap: true, modules: true,
            //                 localIdentName: '[local]_[hash:base64:5]'
            //             }
            //         },
            //         {
            //         {
            //             loader: 'sass-loader', options: { sourceMap: true }
            //         }
            //     ]
            // }
            ///...
            // {
            //     test: /\.(scss)$/,
            //     use: [{
            //         loader: 'style-loader', // inject CSS to page
            //     }, {
            //         loader: 'css-loader', // translates CSS into CommonJS modules
            //     }, {
            //         loader: 'postcss-loader', // Run post css actions
            //         options: {
            //             plugins: function () { // post css plugins, can be exported to postcss.config.js
            //                 return [
            //                     require('precss'),
            //                     require('autoprefixer')
            //                 ];
            //             }
            //         }
            //     }, {
            //         loader: 'sass-loader' // compiles Sass to CSS
            //     }]
            // },
        ]
    },
    resolve: {
        extensions: ['.scss']
    }
}