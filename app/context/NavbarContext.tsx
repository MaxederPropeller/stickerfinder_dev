import React from "react";

interface NavbarContextType {
  isNavbarVisible: boolean;
  setNavbarVisible: (visible: boolean) => void;
}

export const NavbarContext = React.createContext<NavbarContextType>({
  isNavbarVisible: true,
  setNavbarVisible: () => {},
});
