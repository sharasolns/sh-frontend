import vue from 'rollup-plugin-vue'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import css from 'rollup-plugin-css-only'

export default [
  {
    input: 'src/index.js',
    output: [
      {
        format: 'esm',
        file: 'dist/library.mjs'
      },
      {
        format: 'cjs',
        file: 'dist/library.js'
      }
    ],
    plugins: [
        css(),
      vue(),
      peerDepsExternal()
    ]
  }
]
