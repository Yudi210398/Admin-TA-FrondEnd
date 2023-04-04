import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { ImExit } from "react-icons/im";

export const SidebarData = [
  {
    title: "DASHBORD",
    path: "/data",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "DATA ORDER",
    path: "/oder",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "ORDER SUCCESS",
        path: "/selesaitransaksi",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "ORDER FAILED",
        path: "/belumselesaitransaksi",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },

  {
    title: "BARANG DIKIRIM",
    path: "/berhasikirim",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "BELUM DIKIRIM",
        path: "/gagalkirim",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Products",
    path: "/products",
    icon: <FaIcons.FaCartPlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Tambah Produk",
        path: "/products/tambahproduct",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },

  {
    title: "Exit / Keluar",
    icon: <ImExit />,
    click: "kocak",
  },
];
