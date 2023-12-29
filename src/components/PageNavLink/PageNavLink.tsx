import React from "react";
import { NavLink } from "react-router-dom"
import { Nav } from "../../types/nav"
import classNames from "classnames";
import './PageNavLink.scss';

type Props = {
  nav: Nav,
}

export const PageNavLink: React.FC<Props> = ({ nav }) => {
  return (
    <NavLink
      to={nav.path}
      className={({isActive}) => classNames(
        'pageNavLink',
        { 'pageNavLink-active': isActive }
      )}
    >
      {nav.title}
    </NavLink>
  );
};