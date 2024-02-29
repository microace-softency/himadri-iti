import React, { useState, useEffect } from "react";

import TopBar from '../Components/TopBar';
import AppNavbar from '../Components/AppNavbar';
import AppFooter from '../Components/AppFooter';
import { ToastContainer } from "react-toastify";

const Public = ({ children }) => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 131) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="bg-light w-100">
      <header>
        <ToastContainer />
        <TopBar />
        <AppNavbar />
      </header>
      <main className={`main-layout py-1 ${isFixed ? 'top-padding' : ''}`} >{children}</main>
      <footer className="bg-secondary">
        <AppFooter />
      </footer>
    </div>
  );
};

export default Public;