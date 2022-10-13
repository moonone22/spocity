import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastPopup = ({ click }) => {
  const onSubmitData = (e) => {
    e.preventDefault();
    toast.success("정보가 수정되었습니다", {
      autoClose: 3000,
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default ToastPopup;
