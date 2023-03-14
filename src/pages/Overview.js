import React from "react";
import classes from "./halaman.module.css";
import { useSelector } from "react-redux";
import "./overview.css";
import { useAllCustomer } from "../shared/util/httpAllCutomer";
const Overview = () => {
  const { datas } = useAllCustomer();
  const { contenOutNav } = useSelector((state) => state.outNav);
  return (
    <div className={`row ${contenOutNav ? classes.navOut : classes.navIn}`}>
      <div className="col-3">
        <div className="card bg-primary" style={{ width: '18rem"' }}>
          <div className="card-body">
            <div className="card-body-icon">
              <i className="bi bi-person-fill"></i>
            </div>
            <h5 className="card-title">Jumlah Pelanggan</h5>
            <div className="col-9 text-center">
              <div className="display-4">{datas?.allusers}</div>
            </div>

            <a href="/customer/data-pelanggan" className="nav-link text-white">
              Lihat Detail <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="col-3">
        <div className="card bg-secondary" style={{ width: '18rem"' }}>
          <div className="card-body">
            <div className="card-body-icon">
              <i className="bi bi-bucket"></i>
            </div>
            <h5 className="card-title">Jumlah order</h5>
            <div className="col-9 text-center">
              <div className="display-4">
                {!datas?.totalOrder ? 0 : datas?.totalOrder}
              </div>
            </div>

            <a href="/customer/data-pelanggan" className="nav-link text-white">
              Lihat Detail <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="col-3">
        <div className="card bg-success" style={{ width: '18rem"' }}>
          <div className="card-body">
            <div className="card-body-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="85"
                height="90"
                fill="currentColor"
                className="bi bi-clipboard-check-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z" />
              </svg>
            </div>
            <h5 className="card-title">Order sukses</h5>
            <div className="col-9 text-center">
              <div className="display-4">12</div>
            </div>

            <a href="/customer/data-pelanggan" className="nav-link text-white">
              Lihat Detail <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="col-3">
        <div className="card bg-danger" style={{ width: '18rem"' }}>
          <div className="card-body">
            <div className="card-body-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="85"
                height="90"
                fill="currentColor"
                className="bi bi-clipboard-x-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm4 7.793 1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 1 1 .708-.708L8 9.293Z" />
              </svg>
            </div>
            <h5 className="card-title"> order gagal</h5>
            <div className="col-9 text-center">
              <div className="display-4">12</div>
            </div>

            <a href="/customer/data-pelanggan" className="nav-link text-white">
              Lihat Detail <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
