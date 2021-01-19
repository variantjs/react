import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import del from 'rollup-plugin-delete';

const packageJson = require("./package.json");

const config =  [{
  input: "src/install.tsx",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true
    }
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
    }),
  ]
}];

const components = {
  't-input': 'TInput',
  't-button': 'TButton',
  // 't-checkbox': 'TCheckbox',
  // 't-radio': 'TRadio',
  // 't-select': 'TSelect',
  // 't-textarea': 'TTextarea',
  // 't-rich-select': 'TRichSelect',
  // 't-input-group': 'TInputGroup',
  // 't-card': 'TCard',
  // 't-alert': 'TAlert',
  // 't-modal': 'TModal',
  // 't-dropdown': 'TDropdown',
  // 't-pagination': 'TPagination',
  // 't-tag': 'TTag',
  // 't-radio-group': 'TRadioGroup',
  // 't-checkbox-group': 'TCheckboxGroup',
  // 't-table': 'TTable',
  // 't-datepicker': 'TDatepicker',
  // 't-toggle': 'TToggle',
  // 't-dialog': 'TDialog',
};

const componentsConfig = Object.keys(components).map((component) => {
  const componentName = components[component];
  return {
    input: `src/${component}.ts`,
    output: [
      {
        format: "cjs",
        sourcemap: true,
        entryFileNames: `${component}.cjs.js`,
        name: componentName,
        exports: 'named', 
        dir: 'dist',
      },
      {
        format: "esm",
        sourcemap: true,
        entryFileNames: `${component}.js`,
        name: componentName,
        exports: 'named', 
        dir: 'dist',
      }
    ],
    
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src',
      }),
    ]
  }
}).flat();

export default config.concat(componentsConfig)
