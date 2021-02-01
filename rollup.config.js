import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import del from 'rollup-plugin-delete'
const { removeDataTestIdTransformer } = require('typescript-transformer-jsx-remove-data-test-id')

const removeDataTestId = () => ({
  before: [removeDataTestIdTransformer()],
})

const input = [
  'src/index.tsx',
  'src/t-button.ts',
  'src/t-checkbox.ts',
  'src/t-input.ts',
  'src/t-radio.ts',
  'src/t-select.ts',
  'src/t-textarea.ts',
  'src/t-wrapped-checkbox.ts',
  'src/t-wrapped-radio.ts',
]

const config = {
  input: input,
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src',
      transformers: [removeDataTestId],
    }),
  ],
  preserveModules: true,
}

export default config
