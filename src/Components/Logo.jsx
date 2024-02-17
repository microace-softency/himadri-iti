import React from 'react';
import { Link } from 'react-router-dom';

const Logo = (props) => {
  return <img {...props} as={Link} to="/" src="/himadri.logo.jpg" alt="himadri" />
};

export const LogoSecondary = (props) => {
  return <img {...props} as={Link} to="/" src="/msme-logo.webp" alt="MSME" />
};

export default Logo;
