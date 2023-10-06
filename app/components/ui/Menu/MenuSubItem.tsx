import React, { ReactNode } from 'react';

interface MenuSubItemProps {
  children: ReactNode;
}

const MenuSubItem: React.FC<MenuSubItemProps> = ({ children }) => {
  return <div className="block ml-4 py-2">{children}</div>;
};

export default MenuSubItem;
