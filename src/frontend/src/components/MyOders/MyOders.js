import React from "react";
import "./MyOders.scss";
import Bill from "./Bill";

import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, NavLink, Link } from "react-router-dom";
import { push } from "connected-react-router";
import { handleGetOrderByUserId } from "../../services/userService";
import { v4 as uuidv4 } from "uuid";
import BillHeader from "./BillHeader";

class MyOders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
      orderId: null,
      detailHeader: null,
    };
  }

<<<<<<< HEAD
  async componentDidMount() {
    //console.log('CID: ',this.props.userInfo.cid)
    let data = await handleGetOrderByUserId(this.props.userInfo.cid);
    console.log(data);
    this.setState({
      order: data.reverse(),
    });
  }
=======
    async componentDidMount() {
        //console.log('CID: ',this.props.userInfo.cid)
        let data = await handleGetOrderByUserId(this.props.userInfo.id)
        console.log(data)
        this.setState({
            order: data.reverse()
        })
    }
>>>>>>> develop

  handleOnClickOrder = (order) => {
    const detail = this.state.order.filter(
      (item) => item.orderId === order.orderId
    );
    this.setState({
      orderId: order.orderId,
      detailHeader: detail[0],
    });
  };

  handleLogout = () => {
    this.props.processLogout();
    this.props.navigate("/");
  };

  render() {
    return (
      <div>
        <div className="MyOders">
          <div className="slogan-content">
            <div className="san">
              <div className="userLogin">
                <div className="user__wallet">
                  <h3 className="user__wallet-title">Wallet</h3>
                  <div className="user__wallet-list">
                    <div className="user__wallet-list-item">
                      <span>Total Points</span>
                      <span>0</span>
                    </div>
                    <div className="user__wallet-list-item">
                      <span>Points Used</span>
                      <span>0</span>
                    </div>
                    <div className="user__wallet-list-item">
                      <span>Available Points</span>
                      <span>0</span>
                    </div>
                  </div>
                </div>
                <div className="user_sidebar">
                  <ul className="user_sidebar-list">
                    <li className="user_sidebar-list-item">
                      <Link
                        to={"/profile"}
                        className="user_sidebar-list-item-link"
                      >
                        <span>Profile</span>
                      </Link>
                    </li>
                    <li className="user_sidebar-list-item">
                      <Link
                        to={"/change-password"}
                        className="user_sidebar-list-item-link "
                      >
                        <span>Change Password</span>
                      </Link>
                    </li>
                    <li className="user_sidebar-list-item">
                      <Link
                        to={"/my-order"}
                        className="user_sidebar-list-item-link user_sidebar-list-item-link-profile"
                      >
                        <span>My Orders</span>
                      </Link>
                    </li>
                    <li className="user_sidebar-list-item">
                      <a className="user_sidebar-list-item-link">My Refunds</a>
                    </li>
                    <li className="user_sidebar-list-item">
                      <a className="user_sidebar-list-item-link">Need Help</a>
                    </li>
                  </ul>
                  <div
                    className="user_sidebar-logout"
                    onClick={() => this.handleLogout()}
                  >
                    <a className="user_sidebar-logout-link">Logout</a>
                  </div>
                </div>
              </div>

              <div className="Infor">
                <div className="Orders">
                  <div className="List-Order">
                    <h3>My Orders</h3>
                    <div className="Piece-Orders">
                      <div className="scrollbar" id="style-3">
                        <div className="force-overflow">
                          {this.state.order?.map((item, key) => {
                            return (
                              <div
                                className="navlink"
                                key={uuidv4()}
                                onClick={() => this.handleOnClickOrder(item)}
                              >
                                <div
                                  className={
                                    item.orderId === this.state.orderId
                                      ? "Piece-Order-Top Piece-Order boder-green"
                                      : "Piece-Order-Top Piece-Order"
                                  }
                                >
                                  <div className="id_Order">
                                    <span className="id_save">
                                      Orders
                                      <span className="id">#{key + 1}</span>
                                    </span>
                                    <span className="status">
                                      {item.status}
                                    </span>
                                  </div>
                                  <div className="infor_Order">
                                    <div>
                                      <span>
                                        <span className="infor_name">
                                          Order Date
                                        </span>
                                        <span>:</span>
                                      </span>
                                      <span>
                                        {new Date(
                                          item.createdAt
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })}
                                      </span>
                                    </div>
                                    <div>
                                      <span>
                                        <span className="infor_name">
                                          Delivery Time
                                        </span>
                                        <span>:</span>
                                      </span>
                                      <span>{item.delivery}</span>
                                    </div>
                                    <div className="Bolder">
                                      <span>
                                        <span className="infor_name">
                                          Amount
                                        </span>
                                        <span>:</span>
                                      </span>
                                      <span>${item.total}</span>
                                    </div>
                                    <div className="Bolder">
                                      <span>
                                        <span className="infor_name">
                                          Total Price
                                        </span>
                                        <span>:</span>
                                      </span>
                                      <span>${item.total}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Details">
                  <BillHeader item={this.state.detailHeader} key={uuidv4()} />
                  {/* <div className="Space-White"></div> */}
                  {/* <Bill orderId={this.state.orderId} key={uuidv4()} /> */}
                  <div className="Order-Items">
                    <div className="Test">
                      <div className="Item">Item</div>
                      <div className="Quantity">Quantity</div>
                      <div className="Price">Price</div>
                      <div className="Scrollbar"></div>
                    </div>
                    <Bill
                      orderId={this.state.orderId}
                      key={`00921${this.state.orderId}`}
                    />
                  </div>
                </div>
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
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    navigate: (path) => dispatch(push(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOders);
