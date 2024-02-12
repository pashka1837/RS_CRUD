const path = require('path');
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/app.ts',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts'],
    fallback: {
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/node_modules/, path.resolve(__dirname, './src/app_multi.ts')],
      },
    ],
  },
};
// // Generated using webpack-cli https://github.com/webpack/webpack-cli

// const path = require('path');
// const nodeExternals = require('webpack-node-externals')

// const isProduction = process.env.NODE_ENV == 'production';


// const config = {
//     entry: './app.ts',
//     target: 'node',
//     externals: [nodeExternals()],
//     output: {
//         path: path.resolve(__dirname, 'build'),
//     },
//     mode: 'production',
//     plugins: [
        
//         // Add your plugins here
//         // Learn more about plugins from https://webpack.js.org/configuration/plugins/
//     ],
//     module: {
//         rules: [
//             {
//                 test: /\.(ts|tsx)$/i,
//                 loader: 'ts-loader',
//                 exclude: ['/node_modules/', '/app_multi.ts'],
//             },
//             {
//                 test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
//                 type: 'asset',
//             },

//             // Add your rules for custom modules here
//             // Learn more about loaders from https://webpack.js.org/loaders/
//         ],
//     },
//     resolve: {
//         extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
//         fallback: {
//             os: require.resolve("os-browserify/browser"),
//             crypto: require.resolve("crypto-browserify"),
//             path: require.resolve("path-browserify"),
//             http: require.resolve('stream-http'),
//         }
//     },
// };

// module.exports = () => {
//     if (isProduction) {
//         config.mode = 'production';
        
        
//     } else {
//         config.mode = 'development';
//     }
//     return config;
// };
