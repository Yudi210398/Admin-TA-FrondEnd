import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "../pages/halaman.module.css";
function Container({ children }) {
  const { contenOutNav } = useSelector((state) => state.outNav);
  const [tombolUp, setTombolUp] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) setTombolUp(true);
      else setTombolUp(false);
    });
  }, []);
  const scrolAtas = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div className={`${contenOutNav ? classes.navOut : classes.navIn}`}>
      {children}
      {tombolUp && (
        <button
          onClick={scrolAtas}
          className={`btn btn-warning btn-sm ${classes.tombolUp}`}
        >
          UP
        </button>
      )}
    </div>
  );
}

export default Container;
