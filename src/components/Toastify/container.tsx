import React from 'react';
import { ToastContainer } from 'react-toastify';

const ToastifyContainer = () => (
  <div>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      limit={1}
    />
  </div>
);

export default ToastifyContainer;
