import React from "react";

const NavbarLink = ({ text }: { text: string }): JSX.Element => {
  return (
    <li className="nav-item">
      <a href="#" className="nav-link">
        {text}
      </a>
    </li>
  );
};

export default NavbarLink;
