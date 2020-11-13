import { resolve } from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const config: Configuration = {
  entry: resolve(__dirname, 'src/index.tsx'),
  output: {
    filename: 'bundle.[contentHash].js',
    path: resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.gif', '.png', '.jpg', '.jpeg', '.svg'],
    alias: {
      '@scrpoker': resolve(__dirname, 'src'),
    },
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.png?$/,
        loader: 'file-loader',
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [resolve(__dirname, 'src/styles/_colors.scss'), resolve(__dirname, 'src/styles/_sizes.scss')],
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src/assets/index.html'),
    }),
  ],
};

export default config;
