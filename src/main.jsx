import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; // Asegúrate de importar esto
import store from './redux/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter> {/* Asegúrate de envolver tu App con BrowserRouter */}
      <App />
    </BrowserRouter>
  </Provider>
);