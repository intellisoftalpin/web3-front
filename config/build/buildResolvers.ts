import type webpack from 'webpack'
import { type BuildOptions } from './types/config'

export function buildResolvers ({ paths }: BuildOptions): webpack.ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [paths.src, 'node_modules'],
        mainFiles: ['index'],
        alias: {}
    }
}
