import { Header } from './components/Header/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Game } from './Pages/Game/Game';
import { About } from './Pages/About/About';
import { Navigation } from './components/Navigation/Navigation';
import './App.scss';

export const App = () => {
  return (
    <section className="app">
      <Header />

      <div className="app__container">
        <Routes>
          <Route path="game" element={<Navigate to="/" />} />
          <Route index element={<Game />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </section>
  );
}; 