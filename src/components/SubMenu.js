import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useDelete } from "../shared/util/delete-alert";
import { isLogout } from "../Data/LoginSlice";
import { useHttp } from "../shared/util/http-hook";
const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
  font-family: "Rubik Distressed", cursive;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;

  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const dispatch = useDispatch();
  const { sendRequest } = useHttp();
  const token = useSelector((state) => state.authLogin);
  const { dataRespone } = useDelete(
    "Halaman Keluar",
    "Yakin Mau Keluar",
    async () => {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL_API}/delete`,
          "PATCH",
          null,
          {
            "Content-Type": "application/json",
            Authorization: `Cat ${token.tokenLogin}`,
          }
        );
        localStorage.removeItem("dataAdmin");
        dispatch(isLogout());
      } catch (err) {
        console.log(err);
      }
    }
  );
  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel
            onClick={
              item.click === "kocak" ? () => dataRespone() : console.log()
            }
          >
            {item.title}
          </SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
