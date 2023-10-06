import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { type BuildOptions } from './types/config'
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import Dotenv from 'dotenv-webpack'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

export function buildPlugins ({ paths, isDev }: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        new webpack.ProgressPlugin(),
        new NodePolyfillPlugin(),
        new HtmlWebpackPlugin({
            template: paths.html
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].css'
        }),
        new FaviconsWebpackPlugin({
            logo: `${paths.public}/favicon.png`,
            outputPath: 'static/assets/favicon',
            prefix: 'static/assets/favicon/',
            cache: true
        }),
        new ReactRefreshWebpackPlugin(),
        // new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev)
        }),
        new Dotenv({
            safe: false,
            defaults: true
        })
    ]
}
