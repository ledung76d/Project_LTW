import React from "react";
import "./Dashbroad.scss";
import EditShop from "../EditShop/EditShop";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import adminService from "../../../services/adminService";
class Dashbroad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countNumber: 0,
      countOrder: 0,
    };
  }

  async componentDidMount() {
    let data = await adminService.handleGetProductBySid(
      this.props.adminInfo.sid
    );
    let data1 = await adminService.handleGetOrderBySid(
      this.props.adminInfo.sid
    );
    //console.log(data1)
    this.setState({
      countNumber: data.length,
      countOrder: data1.length,
    });
  }

  handleChangeMenu = (key) => {
    this.props.changeMenu(key);
  };

  render() {
    let admin = this.props.adminInfo;

    console.log("admin: ", admin);
    return (
      <div className="order-container">
        <div className="order-12">
          <div className="order-1">
            <div className="logoShop">
              <img src={admin.logo} />
              <i className="fas fa-check-circle"></i>
            </div>
            <h1>{admin.storeName}</h1>
            <div>{admin.content}</div>
            <div className="Address">
              <span className="logo_add">
                <i className="fas fa-map-marker-alt"></i>
              </span>
              <address>{admin.address}</address>
            </div>
            <div className="Phone_number">
              <span className="logo_phone">
                <i className="fas fa-phone"></i>
              </span>
              <a href="tel:018927525111">{admin.phone}</a>
            </div>
            <div className="but-visit">
              <button className="visit_Shop">Visit Shop</button>
            </div>
          </div>
          <div className="order-2">
            <div className="but_edit">
              <span className="logo_edit">
                <i className="far fa-edit"></i>
              </span>
              <button
                className="edit_Shop"
                onClick={() => this.handleChangeMenu(5)}
              >
                Edit Shop
              </button>
            </div>
            <img src={admin.img} />
          </div>
        </div>
        <div className="order-34">
          <div className="order-3">
            <div className="Products">
              <div className="title_Box">Products</div>
              <div className="element_Box">
                <div className="element bor_bot">
                  <div
                    className="item_box"
                    style={{ backgroundColor: "#FC9EC6" }}
                  >
                    <i className="fas fa-box" style={{ color: "#fff" }}></i>
                  </div>
                  <div className="text_box">
                    <p className="Number">{this.state.countNumber}</p>
                    <p className="Name">Total Products</p>
                  </div>
                </div>
                <div className="element">
                  <div
                    className="item_box"
                    style={{ backgroundColor: "#6EBBFD" }}
                  >
                    <i
                      className="fas fa-clipboard-list"
                      style={{ color: "#fff" }}
                    ></i>
                  </div>
                  <div className="text_box">
                    <p className="Number">{this.state.countOrder}</p>
                    <p className="Name">Total Orders</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="Products">
              <div className="title_Box">Revenue</div>
              <div className="element_Box">
                <div className="element bor_bot">
                  <div
                    className="item_box"
                    style={{ backgroundColor: "#C7AF99" }}
                  >
                    <i className="fas fa-wallet" style={{ color: "#fff" }}></i>
                  </div>
                  <div className="text_box1">
                    {/* <p className="Number">249</p> */}
                    <p className="Name">Gross Sales</p>
                  </div>
                </div>
                <div className="element">
                  <div
                    className="item_box"
                    style={{ backgroundColor: "#FFA7AE" }}
                  >
                    <i
                      className="fas fa-dollar-sign"
                      style={{ color: "#fff" }}
                    ></i>
                  </div>
                  <div className="text_box1">
                    {/* <p className="Number">249</p> */}
                    <p className="Name">Current Balance</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="Products">
              <div className="title_Box">Others</div>
              <div className="element_Box">
                <div className="element bor_bot">
                  <div
                    className="item_box"
                    style={{ backgroundColor: "#D59066" }}
                  >
                    <i className="fas fa-percent" style={{ color: "#fff" }}></i>
                  </div>
                  <div className="text_box">
                    <p className="Number">0 %</p>
                    <p className="Name">Admin Commission Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-4">
            <div className="Registered">
              <div className="Registered_Since">Registered Since</div>
              <div className="Registered_Time">
                {new Date(admin.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <div className="Payment">
              <div className="Payment_Infor">Payment Information</div>
              <div className="Payment_elements">
                <div className="Payment_element">Name: {admin.storeName}</div>
                <div className="Payment_element heading">
                  Email: {admin.userName}
                </div>
                <div className="Payment_element heading">Bank: {}</div>
                <div className="Payment_element heading">Account No.: {}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.admin.isLoggedIn,
    adminInfo: state.admin.adminInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAppMode: (payload) => dispatch(actions.changeAppMode(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashbroad);
