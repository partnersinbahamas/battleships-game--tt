import { Header } from './components/Header/Header';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Game } from './Pages/Game/Game';
import { About } from './Pages/About/About';
import { Navigation } from './components/Navigation/Navigation';
import { Mouse } from './classes/Mouse';
import { useEffect } from 'react';
import { Battlefield } from './classes/Battlefield';
import { Ship } from './classes/Ship';

export const App = () => {
  const mouse = new Mouse(document.body);
  const field = new Battlefield();

  let druggedShip: Ship | null = null;

  useEffect(() => {
    let sq = field.createField(10);

    console.log(sq);
  })

  const onShipMove = () => {
    if (mouse.left && !mouse.prevLeft) {
      const ship = field.field.find((el: Ship) => {
        const div = document.getElementById(`#${el.name}-${el.id}`);

        console.log(div);

        return el.isUnder({x: mouse.x!, y: mouse.y!}, div!);
      })

      if (ship) {
        druggedShip = ship;
      }

      if (mouse.left && druggedShip) {
        const field = document.querySelector('.field__list-you')?.getBoundingClientRect();
        druggedShip.x = mouse.x! - field?.top!;
        druggedShip.y = mouse.y! - field?.left!
      }
    }
  }

  onShipMove();

  return (
    <section className="app"
      onMouseMove={(event) => mouse.onMouseMove(event)}
      onMouseDown={(event) => mouse.onMouseDown(event)}
      onMouseUp={(event) => mouse.onMouseUp(event)}
    >
      <Header />

      <div className="app__container">
        <Routes>
          <Route path="game" element={<Navigate to="/" />} />
          <Route index element={<Game />} />
  
          <Route path="about" element={<About />} />
  
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <div className="app__navigation">
        <Navigation />
      </div>
    </section>
  );
}; 