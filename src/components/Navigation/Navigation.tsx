import { navigations } from "../../helpers/variables";
import { PageNavLink } from "../PageNavLink/PageNavLink";
import { Nav } from "../../types/nav";
import './Navigation.scss';

export const Navigation = () => {
  const gameNav: Nav = navigations[0];
  const aboutNav: Nav = navigations[1];

  return (
    <nav className="navigation">
      <PageNavLink key={gameNav.id} nav={gameNav} />

      <p className="navigation__border"/>

      <PageNavLink key={aboutNav.id} nav={aboutNav} />
    </nav>
  );
};