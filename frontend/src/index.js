import React from 'react';
import ReactDOM from 'react-dom/client';

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <BrowserRouter forceRefresh={true}>
    <div className="d-flex flex-column min-vh-100 justify-content-between">
      <App className="container" />
      <Footer className="footer" />
    </div>

  </BrowserRouter>
  //</React.StrictMode>
);
