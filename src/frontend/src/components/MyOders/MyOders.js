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
import NavUser from "../UserLogin/NavUser";

class MyOders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
      orderId: null,
      detailHeader: null,
    };
  }

  async componentDidMount() {
    let data = await handleGetOrderByUserId(this.props.userInfo.cid);
    this.setState({
      order: data.reverse(),
    });
  }

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
              <NavUser />
              <div className="Infor">
                <div className="Orders">
                  <div className="List-Order">
                    <h3> </h3>
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
                                    <span
                                      className={
                                        item.status === "Order Received"
                                          ? "status"
                                          : item.status === "Accepted"
                                          ? "statusAc"
                                          : "statusRej"
                                      }
                                    >
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
