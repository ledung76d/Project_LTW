import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./NavigatorBar.scss";
import LogoShop from "../../assets/images/PickBazar.png";
import Login from "../Auth/Login";
import { Link } from "react-router-dom";
import LoginIcon from "../Auth/LoginIcon";
import IconCart from "../ProductCart/IconCart";
import { toast } from "react-toastify";

class NavigatorBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleProduct: "",
      removeSearchData: false,
      checkDropdow: false,
    };
  }

  handleChangeSearchTitleProduct = (event) => {
    // console.log(">>> on change", this.state);
    if (event.target.value === "") {
      this.setState({
        titleProduct: event.target.value,
        removeSearchData: false,
      });
      return;
    }
    this.setState({
      titleProduct: event.target.value,
      removeSearchData: true,
    });
  };
  handleSearchTitleProduct = () => {
    // console.log(">>> check Search bar");
  };
  handleRemoveTitleProduct = () => {
    // console.log(">>> check remove");
    this.setState({
      titleProduct: "",
      removeSearchData: false,
    });
  };
  handleButtonDropdown = () => {
    this.setState({
      checkDropdow: !this.state.checkDropdow,
    });
    // console.log(">>> check dropdown", this.state.checkDropdow);
  };

  handleFeature = () => {
    toast.warning("Feature coming soon :))", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  render() {
    let { titleProduct, removeSearchData, checkDropdow } = this.state;
    //JSX
    return (
      <>
        <div className="app">
          <header className="header">
            <div className="">
              <nav className="header__navbar">
                <ul className="header__navlist-list">
                  <li className="header__navbar-item header__navbar-item--separate">
                    <Link to="/">
                      <img
                        className="header__navbar-item-logo"
                        src={LogoShop}
                      />
                    </Link>
                  </li>
                </ul>

                <ul className="header__navlist-list">
                  <li className="header__navbar-item">
                    <Link to={"/admin"} className="header__navbar-item-link">
                      <span>My shop</span>
                    </Link>
                  </li>
                  <li className="header__navbar-item">
                    <p
                      style={{ cursor: "pointer" }}
                      className="header__navbar-item-link"
                      onClick={this.handleFeature}
                    >
                      <span>Offers</span>
                    </p>
                  </li>
                  <li className="header__navbar-item header__navbar-item--separate">
                    <Link to={"/faq"} className="header__navbar-item-link">
                      <span>FAQ</span>
                    </Link>
                  </li>
                  <li className="header__navbar-item ">
                    <Link to={"/contact"} className="header__navbar-item-link">
                      <span>Contacts</span>
                    </Link>
                  </li>
                  <li className="header__navbar-item text--strong">
                    {/* <button type="button" className="btn btn-danger" style={{width: '50px',height: '30px'}} onClick={()=>this.handleShowLogin()} >Join</button> */}
                    <Login />
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          <footer className="footer">
            <nav className="bottom__navbar">
              <ul className="navbar__list">
                <li className="navbar__list-item">
                  <i className="fas fa-bars"></i>
                </li>
                <li className="navbar__list-item">
                  <i className="fas fa-search"></i>
                </li>
                <li className="navbar__list-item">
                  <a href="#">
                    <i className="fas fa-home"></i>
                  </a>
                </li>

                <li className="navbar__list-item">
                  {/* <i className="fas fa-shopping-bag"></i> */}
                  <IconCart />
                </li>
                <li className="navbar__list-item">
                  {/* <i className="far fa-user"></i> */}
                  <LoginIcon />
                </li>
              </ul>
            </nav>
          </footer>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigatorBar);
