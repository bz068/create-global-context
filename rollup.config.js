import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { babel } from '@rollup/plugin-babel';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'];

const presets = [
  [
    '@babel/preset-env',
    {
      modules: false,
    },
  ],
  '@babel/preset-react',
  '@babel/preset-typescript',
];
export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'esm',
      },
    ],
    plugins: [
      commonjs(),
      resolve({
        extensions,
      }),
      typescript({
        tsconfigOverride: {
          exclude: ['__tests__', 'src/**/*.test.ts', 'src/**/*.test.tsx'],
        },
      }),
      babel({
        extensions,
        babelHelpers: 'bundled',
        presets,
        exclude: 'node_modules/**',
      }),
    ],
    external: [...Object.keys(pkg.devDependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  },
  {
    input: 'dist/esm/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
