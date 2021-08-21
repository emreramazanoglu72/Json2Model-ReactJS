import React from 'react';
import ReactDOM from 'react-dom';
 import App from './App';
import reportWebVitals from './reportWebVitals';
import "prismjs/components/prism-clike";
import "prismjs/components/prism-java";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css"; 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
