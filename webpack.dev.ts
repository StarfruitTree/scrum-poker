import { merge } from 'webpack-merge';
import config from './webpack.common';

export default merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: '127.0.0.1',
    historyApiFallback: true,
    clientLogLevel: 'none',
    port: 3000,
  },
});
