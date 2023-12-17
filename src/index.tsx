import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { BrowserRouter  as AppRouter } from 'react-router-dom';
import { App } from './App';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <AppRouter>
      <App />
    </AppRouter>
  </Provider>
);