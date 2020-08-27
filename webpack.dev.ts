import { merge } from 'webpack-merge';
import config from './webpack.common';

export default merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    clientLogLevel: 'none',
    port: 3000,
  },
});
