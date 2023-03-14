import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { isContenOutNav } from "../Data/AuthSlice";
import { useDispatch } from "react-redux";
import classes from "./sidebar.module.css";
const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);
  const OnOutNavContent = (contenOutNav) =>
    dispatch(isContenOutNav({ contenOutNav }));

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars
              onClick={() => {
                showSidebar();
                OnOutNavContent(true);
              }}
            />
          </NavIcon>
          <h1
            className={classes.title}
            style={{
              color: "WHITE",
              margin: "auto",
              textTransform: "uppercase",
            }}
          >
            ADMIN LORD'S
          </h1>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose
                onClick={() => {
                  showSidebar();
                  OnOutNavContent(false);
                }}
              />
            </NavIcon>
            {SidebarData.map((item, index) => (
              <SubMenu item={item} key={index} />
            ))}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
