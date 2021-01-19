import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import VariantJs from './install'
import { VariantJSConfiguration } from './context/Configuration';

const configuration: VariantJSConfiguration = {
  TInput: {
    type: 'text',
    classes: ['bg-red-500', 'border-2'],
    variants: {
      test: {
        classes: 'bg-blue-500',
        type: 'password'
      },
      other: {
        className: 'bg-yellow-500',
      }
    },
    placeholder: "test",
    className: "text-white",
    fixedClasses: "border-red-200 border-2"

    // fixedClasses: 'block w-full px-3 py-2 transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
    // classes: 'text-black placeholder-gray-400 bg-white border-gray-300 focus:border-blue-500 ',
    // variants: {
    //   danger: {
    //     classes: 'border-red-300 bg-red-50 placeholder-red-200 text-red-900',
    //   },
    //   success: {
    //     classes: 'border-green-300 bg-green-50 placeholder-gray-400 text-green-900'
    //   }
    // }
  },
}

ReactDOM.render(
  <VariantJs configuration={configuration}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </VariantJs>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
