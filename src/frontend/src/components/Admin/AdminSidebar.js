import React from "react";
import "bootstrap";
import "./AdminSidebar.scss";

class AdminSideBar extends React.Component {
  handleChangeMenu = (key) => {
    this.props.changeMenu(key);
  };

  render() {
    let check = this.props.menu;
    return (
      <div className="admin-sidebar-container">
        <div className="admin-sidebar-container-fixed">
          <div
            className="sidebar-item"
            onClick={() => this.handleChangeMenu(1)}
          >
            <span className={check === 1 ? "text-color--green" : ""}>
              <i className="fas fa-store-alt sidebar-item-icon"></i>
              Dashbroad
            </span>
          </div>

          <div
            className="sidebar-item"
            onClick={() => this.handleChangeMenu(2)}
          >
            <span className={check === 2 ? "text-color--green" : ""}>
              <i className="fas fa-cubes sidebar-item-icon"></i>
              Products
            </span>
          </div>

          <div
            className="sidebar-item"
            onClick={() => this.handleChangeMenu(3)}
          >
            <span className={check === 3 ? "text-color--green" : ""}>
              <i className="far fa-money-bill-alt sidebar-item-icon"></i>
              Orders
            </span>
          </div>

          <div
            className="sidebar-item"
            onClick={() => this.handleChangeMenu(4)}
          >
            <span className={check === 4 ? "text-color--green" : ""}>
              <i className="fas fa-chart-bar sidebar-item-icon"></i>
              Analysis
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminSideBar;
