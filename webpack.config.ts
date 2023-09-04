import { buildWebpackConfig } from './config/build/buildWebpackConfig'
import { type BuildEnv, type BuildPaths } from './config/build/types/config'
import path from 'path'

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        public: path.resolve(__dirname, 'public')
    }

    const mode = env.mode || 'development'
    const isDev = mode === 'development'
    const PORT = env.port || 3000

    return buildWebpackConfig({
        paths,
        port: PORT,
        isDev,
        mode
    })
}
