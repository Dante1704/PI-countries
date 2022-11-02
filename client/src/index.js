import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; //abrazo la app para poder crear rutas
import { store } from "./redux/store"; //importo el store y lo pongo al servicio de los componentes con el provider
import { Provider } from 'react-redux'; //gracias al provider tengo disponible el store en todos los componentes que desee que se suscriban



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
