import Sidebar from "./components/Sidebar";
import { Route, Routes, Navigate } from "react-router-dom";
import Overview from "./pages/Overview";
import { ReportsTwo, ReportsThree } from "./pages/Reports";
import Team from "./pages/Team";
import { Fragment, useCallback, useEffect } from "react";
import Order from "./pages/Order";
import SingleTransaksi from "./pages/SingleTransaksi";
import ProductTambah from "./pages/product/produtTambah/ProductTambah";
import ParentGetProduct from "./pages/product/getProduct/ParentGetProduct";
import ParentsLogin from "./pages/auth/loginParrent/ParentsLogin";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "./Data/LoginSlice";
import { useHttpRefreshToken } from "./shared/util/http-RefreshToken";
import DetailTransaksiProduck from "./LihatTransaksiDetailProduk/Parent/DetailTransaksiProduck";
import HalamanEditProduk from "./LihatTransaksiDetailProduk/Parent/HalamanEditProduk";
import ParerntSuksesTransaksi from "./pages/components/singleTransaksi/ParentSuksesTransaksi/ParerntSuksesTransaksi";
import PengirimanSukses from "./pages/components/delivery/PengirimanSukses";
import BelumKirim from "./pages/components/delivery/BelumKirim";
import { OrderSelesai } from "./pages/components/allOrder/OrderNotif/OrderSelesai";
import { OrderBelumSelesai } from "./pages/components/allOrder/OrderNotif/OrderBelumSelesai";
import ParentGagalTranssaksi from "./pages/components/singleTransaksi/ParentGagalTransaksi/ParentGagalTranssaksi";

function App() {
  const { datas } = useHttpRefreshToken();
  const dispatch = useDispatch();
  const onLogin = useCallback(
    (tokenLogin, refreshToken, login) =>
      dispatch(isLogin({ tokenLogin, refreshToken, login })),
    [dispatch]
  );

  const { tokenLogin, login } = useSelector((state) => state.authLogin);
  useEffect(() => {
    const dataAdmin = JSON.parse(localStorage.getItem("dataAdmin"));
    if (
      dataAdmin?.token &&
      dataAdmin?.refreshtoken &&
      dataAdmin.waktuExpieyed > new Date().getTime()
    ) {
      if (login) {
        onLogin(
          datas.length === 0 ? dataAdmin?.token : datas,
          dataAdmin?.refreshtoken,
          dataAdmin?.login
        );
      } else
        onLogin(dataAdmin?.token, dataAdmin?.refreshtoken, dataAdmin?.login);
    } else {
      if (login) {
        setTimeout(async function () {
          localStorage.removeItem("dataAdmin");
          alert("token kadaluarsa");
          window.location.reload();
        }, 10);
      }
    }
    const fetch = async () => {
      onLogin(datas, dataAdmin?.refreshtoken, dataAdmin?.login);
    };
    if (login) {
      fetch();
    }
  }, [onLogin, datas, login]);
  let ruting;
  if (tokenLogin) {
    ruting = (
      <Fragment>
        <Sidebar />
        <Routes>
          <Route path="/data" element={<Overview />} />
          <Route path="/oder" element={<Order />} />
          <Route path="/oder/" element={<Order />} />
          <Route path="/oder/:idorder" element={<SingleTransaksi />} />
          <Route path="/products" element={<ParentGetProduct />} />
          <Route
            path="/detailproduct/:_idProduct"
            element={<DetailTransaksiProduck />}
          />

          <Route
            path="/editproduct/:_idProduct"
            element={<HalamanEditProduk />}
          />

          <Route path="/reports/reports2" element={<ReportsTwo />} />
          <Route path="/reports/reports3" element={<ReportsThree />} />
          <Route path="/berhasikirim" element={<PengirimanSukses />} />
          <Route path="/gagalkirim" element={<BelumKirim />} />
          <Route path="/selesaitransaksi" element={<OrderSelesai />} />
          <Route
            path="/belumselesaitransaksi"
            element={<OrderBelumSelesai />}
          />
          <Route path="/team" element={<Team />} />
          <Route path="/products/tambahproduct" element={<ProductTambah />} />

          <Route
            path="/orderresi/:_resi"
            element={<ParerntSuksesTransaksi />}
          />

          <Route
            path="/gagaltransaksi/:_gagalresi"
            element={<ParentGagalTranssaksi />}
          />

          <Route path="*" element={<Navigate to="/data" replace />} />
        </Routes>
      </Fragment>
    );
  } else {
    ruting = (
      <Fragment>
        <Routes>
          <Route path="/loginadmin" element={<ParentsLogin />} />

          <Route path="*" element={<Navigate to="/loginadmin" replace />} />
        </Routes>
      </Fragment>
    );
  }

  return ruting;
}

export default App;
