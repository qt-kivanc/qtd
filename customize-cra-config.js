import { 
  override, 
  addLessLoader, 
  fixBabelImports, 
  overrideDevServer, 
  addWebpackAlias, 
  addWebpackPlugin 
} from 'customize-cra';
//import hotLoader from 'react-app-rewire-hot-loader';
//import { theme } from './src/config/theme/themeVariables';
const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const sourcePath = resolve(__dirname, 'src');
const rootPath = resolve(__dirname, '');

const supportMjs = () => webpackConfig => {
  webpackConfig.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    loader: 'css-loader',
    options: {
      modules: true, // must add this
    },
    // type: 'javascript/auto',
  });
  return webpackConfig;
};

const devServerConfig = () => config => {
  return {
    ...config,
    port: 4040,
    https: false,
    hot: true,
    open: false
  }
}

const jessLoaderConfig = () => {
  return {
    javascriptEnabled: true,
    modifyVars: {
      //...theme,
    }
  }
}

const babelImportsConfig = () => {
  return {
    libraryName: 'qtd',
    libraryDirectory: 'es',
    style: true,
    modules: true,
    options: {
      modules: true, // must add this
    },
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader?modules'],
  }
}

const aliasConfig = () => {
  return {
    '@context': resolve(sourcePath, `context`),
    '@types': resolve(sourcePath, `types`)
  }
}

module.exports = {
  webpack: override(
    addLessLoader(
      jessLoaderConfig()
    ),
    fixBabelImports(
      'import', 
      babelImportsConfig()
    ),
    supportMjs(),
    addWebpackAlias(aliasConfig()),
    addWebpackPlugin(
      new CopyWebpackPlugin([
          //{from:'public/locales', to:'locales'}, 
          //{from:'public/themes', to:'themes'}, 
          //{from:'public/assets', to:'assets'},
          //{from:'public/config/assets.json', to:'config/assets.json', toType: 'file'}, 
          //{from:'public/config/config.json', to:'config/config.json', toType: 'file'}, 
          //{from:'public/config/menu.json', to:'config/menu.json', toType: 'file'}, 
          //{from:'public/config/routes.json', to:'config/routes.json', toType: 'file'}
        ])
    ),
    (config, env) => {
      //return hotLoader(config, env);
    }
  ),
  devServer: overrideDevServer(
    devServerConfig()
  )
};
