import React from 'react';
import { FaSun, FaMoon, FaTwitter, FaGithub } from 'react-icons/fa';
import { TbBrandNextjs } from 'react-icons/tb';

export const Icons = {
  sun: FaSun,
  moon: FaMoon,
  twitter: FaTwitter,
  logo: () => (
    <TbBrandNextjs/>
  ),
  gitHub: () => (
   <FaGithub />
  ),
};
