// MenuDropdown.tsx
'use client'
// MenuDropdown.tsx
import React, { useState, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';


interface MenuDropdownProps {
  children: ReactNode;
  icon: React.ReactNode; // Accept any ReactNode as an icon
  WrapperCn?: string;
  ButtonCn?: string;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ children, icon, WrapperCn, ButtonCn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const themeMode = `${theme === 'dark' ? 'bg-black text-white border border-gray-100' : 'bg-white'}`
  const wrapperClasses = `${WrapperCn || 'relative inline-block text-left'}`;
  const buttonClasses = `${theme === 'dark' ? 'text-white' : null } ${ButtonCn || 'px-4 py-2'}`;
  const dropDownClasses = `${themeMode} origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-4`

  // Find the label and other children
  let label = null;
  let otherChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (typeof child === 'string') {
      label = child;
    } else {
      otherChildren.push(child);
    }
  });

  return (
    <div className={wrapperClasses}>
      <button onClick={toggleDropdown} className={buttonClasses}>
        <div className="space-x-4">
        {label} {icon} {/* Render the dynamic icon */}
        </div>
      </button>
      {isOpen && (
        <div className={dropDownClasses}>
          <div className="flex-block space-y-2">{otherChildren}</div>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
