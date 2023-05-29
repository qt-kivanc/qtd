/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable import/first */
import styles from "rollup-plugin-styles";
const autoprefixer = require('autoprefixer');
import babel from '@rollup/plugin-babel';
import sourcemaps from 'rollup-plugin-sourcemaps';
import commonjs from '@rollup/plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';

//import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import localResolve from 'rollup-plugin-local-resolve';

import pkg from "./package.json";

const input = 'src/index.ts'
const production = !process.env.ROLLUP_WATCH;

const EXTERNALS = [
  'react',
  'react-dom',
  'styled-components',
  '@babel/runtime'
]

var MODE = [
  { 
    file: pkg.main,
    format: 'cjs',
    sourcemap: !production,
    name: '@quan-tech/qt-design'
  },
  { 
    file: pkg.module,
    format: 'esm',
    sourcemap: !production
  }
]

var config = []

const getDependencies = () => {

  let a = Object.keys(pkg.dependencies || {});
  let b = Object.keys(pkg.devDependencies || {});
  let c = Object.keys(pkg.peerDependencies || {});

  let dependencies = a.concat(b).concat(c);
      dependencies.push("@babel/runtime/helpers/slicedToArray");
      dependencies.push("@babel/runtime/helpers/defineProperty");
      dependencies.push("@babel/runtime/helpers/extends");
      dependencies.push("@babel/runtime/helpers/taggedTemplateLiteral");
      dependencies.push("@babel/runtime/helpers/toConsumableArray");
      dependencies.push("@babel/runtime/helpers/typeof");
      
  return dependencies;

}

MODE.forEach((m) => {

  var conf = {
    input: input,
    output: {
      name: "qt-design",
      file: `dist/index.${m.format}.js`,
      entryFileNames: "[name].[hash].js",
      // Governs names of CSS files (for assets from CSS use `hash` option for url handler).
      // Note: using value below will put `.css` files near js,
      // but make sure to adjust `hash`, `assetDir` and `publicPath`
      // options for url handler accordingly.
      assetFileNames: "[name]-[hash][extname]",
      format: m.format,
      exports: "named",
      globals: {
        /*
        'react': 'React',
        'react-dom': 'ReactDOM',
        '@babel/runtime/helpers/slicedToArray': '_slicedToArray',
        '@babel/runtime/helpers/defineProperty': '_defineProperty',
        '@babel/runtime/helpers/toConsumableArray': '_toConsumableArray',
        '@babel/runtime/helpers/typeof': '_typeof',
        '@babel/runtime/helpers/taggedTemplateLiteral': '_taggedTemplateLiteral',
        '@babel/runtime/helpers/extends': '_extends',
        'uuid': 'uuid',
        'react-transition-group': 'reactTransitionGroup',
        'styled-components': 'styled',
        'react-router-dom': 'reactRouterDom',
        'react-router': 'reactRouter',
        'react-svg': 'reactSvg',
        'moment': 'moment',
        'axios': 'axios',
        'react-input-mask': 'InputMask',
        'react-number-format': 'NumberFormat',
        'react-spring': 'reactSpring',
        'autoprefixer': 'autoprefixer',
        'nanoid': 'nanoid',
        'query-string': 'queryString',
        'postcss': 'postcss',
        */
      }
    },
    // this externelizes react to prevent rollup from compiling it
    external: getDependencies(),
    plugins: [

      resolve({
        extensions: ['.*', '.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css']
      }),
      localResolve(),
      typescript(
        {
          sourceMap: !production,
          inlineSourceMap: !production
        }
      ),

      copy({
        targets: [
          //{ src: 'src/index.html', dest: 'dist' },
          // { src: ['assets/fonts/arial.woff', 'assets/fonts/arial.woff2'], dest: 'dist/public/fonts' },
          // { src: 'assets/images/**/*', dest: 'dist/public/images' }
        ]
      }),

      commonjs({
        exclude: ["src/**"],
        include: ["node_modules/**"]
      }),

      // these are babel comfigurations
      babel({
        exclude: 'node_modules/**',
        plugins: [
          '@babel/transform-runtime'
        ],
        babelHelpers: 'runtime'
      }),

      styles({
        autoModules: /\.module\.\S+$/,
        namedExports: false,
        minimize: true,
        modules: {
          generateScopedName: "qtd__[local]__[hash:8]"
        },
        postcss: {
          extract: true,
          plugins: [
            autoprefixer()
          ]
        }
      }),

      json(),
      sourcemaps(),
      builtins(),
      globals(),
      
    ],
    watch: {
      clearScreen: false
    }
  }
  config.push(conf)
})

export default [
  ...config,
]