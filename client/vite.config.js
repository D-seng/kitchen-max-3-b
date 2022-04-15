import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import graphql from '@rollup/plugin-graphql'

// https://vitejs.dev/config/
const path = require('path')
export default defineConfig({
    plugins: [vue(), graphql()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
})
