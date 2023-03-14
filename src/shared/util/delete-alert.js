import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export function useDelete(title, pesan, fungsiyes) {
  const dataRespone = () => {
    confirmAlert({
      title: title,
      message: pesan,
      buttons: [
        {
          label: "Yes",
          onClick: fungsiyes,
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  return {
    dataRespone,
  };
}
