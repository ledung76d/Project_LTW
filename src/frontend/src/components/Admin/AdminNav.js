import React from "react";
import "./AdminNav.scss";
import LogoShop from "../../assets/images/PickBazar.png";
import LogoButtonAdmin from "../../assets/images/admin/avatar-placeholder.svg";
class AdminNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isdropDown: true,
    };
  }
  // handleLogoutButton = () => {
  //     this.props.processLogout()
  // }

  render() {
    console.log("check btn", this.state.isdropDown);
    return (
      <>
        <div className="AdminNav">
          <div className="container__AdminNav">
            <div className="AdminNav__grid">
              <div className="AdminNav__logo">
                <img className="AdminNav__logo-img" src={LogoShop} />
              </div>
              <div className="AdminNav__login">
                <button className="AdminNav-btn-createShop">Create Shop</button>
                <button
                  className="AdminNav__login-btn"
                  onClick={() =>
                    this.setState({ isdropDown: !this.state.isdropDown })
                  }
                >
                  <img
                    src={LogoButtonAdmin}
                    className="AdminNav__login-btn-logo"
                  ></img>
                </button>
                <ul
                  className={
                    this.state.isdropDown
                      ? "AdminNav__dropdown--gowth AdminNav__login-list"
                      : "AdminNav__dropdown--hidden  AdminNav__login-list"
                  }
                >
                  <li className="AdminNav__login-list-item">Profile</li>
                  <li className="AdminNav__login-list-item AdminNav__logout">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="AdminNavFake"></div>
      </>
    );
  }
}

export default AdminNav;
