import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content">
          <Outlet></Outlet>
        </div>
      </div>

      {/* <div>
        Test link
        <div>
          <button>
            <Link to={`users`}>go to user page</Link>
          </button>
          <button>
            <Link to={`admins`}>go to admin page</Link>
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default App;
