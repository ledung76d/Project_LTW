import React from "react";
import "./AdminOrder.scss";
import adminService from "../../../services/adminService";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { v4 as uuidv4 } from "uuid";
import OrderDetail from "./OrderDetail";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class AdminOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
      modal: false,
      detailData: null,
      tmpOrder: null,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    console.log(">>> check Order", this.state.modal);
    this.setState({
      modal: !this.state.modal,
    });
  }

  async componentDidMount() {
    //console.log(this.props.adminInfo)
    let order = await adminService.handleGetOrderBySid(
      this.props.adminInfo.sid
    );
    this.setState({
      order: order,
    });
    //console.log(this.state.order)
  }

  changeOrderStatus = async (orderId, status) => {
    //console.log(this.state)
    await adminService.handleChangeOrderStatus(orderId, status);
    setTimeout(() => this.updateChange(), 100);
  };

  updateChange = async () => {
    let order = await adminService.handleGetOrderBySid(
      this.props.adminInfo.sid
    );
    this.setState({
      order: order,
    });
  };

  detailButton = async (orderId) => {
    let data = await adminService.handleGetOrderItemBySidAndOrderId(
      orderId,
      this.props.adminInfo.sid
    );
    let tempOrder = null;
    for (let i = 0; i < this.state.order.length; i++) {
      if (this.state.order[i].orderId === orderId) {
        tempOrder = this.state.order[i];
      }
    }
    //console.log('CHa',data)
    this.setState({
      detailData: data,
      tmpOrder: tempOrder,
    });

    this.toggle();
  };

  render() {
    return (
      <>
        <div className="container__AdminOrder">
          <div className="adminOrder__header">
            <h3 className="adminOrder__header-title">Orders</h3>
            <div className="adminOrder__header-search">
              <button className="adminOrder__header-search-btn">
                <i className="fas fa-search search-btn-icon"></i>
              </button>
              <input
                className="adminOrder__header-search-input"
                type="search"
                placeholder="Type your query and press enter"
              ></input>
            </div>
          </div>
          <div className="adminOrder__body">
            <table className="adminOrder-table">
              <colgroup>
                <col></col>
                <col style={{ width: "150px" }}></col>
                <col></col>
                <col style={{ width: "120px" }}></col>
                <col></col>
                <col></col>
                <col></col>
                <col></col>
                <col style={{ width: "150px" }}></col>
              </colgroup>
              <thead>
                <tr>
                  <th></th>
                  <th>Tracking Number</th>
                  <th>Delivery Fee</th>
                  <th>Total</th>
                  <th>Order Date</th>
                  <th>Status</th>
                  <th>Shipping Address</th>
                  <th>Download</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.order?.map((item) => {
                  return (
                    <tr key={uuidv4()}>
                      <td></td>
                      <td>{item.orderId}</td>
                      <td>$0.00</td>
                      <td>{item.total}</td>
                      <td>
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td>{item.status}</td>
                      <td>{item.address}</td>
                      <td>Download</td>
                      <td>
                        <div className="actions__status">
                          {item.status === "Accepted" ||
                          item.status === "Rejected" ? (
                            <></>
                          ) : (
                            <>
                              <button
                                className="actions__status--accept"
                                onClick={() =>
                                  this.changeOrderStatus(
                                    item.orderId,
                                    "Accepted"
                                  )
                                }
                              >
                                Accept
                              </button>
                              <button
                                className="actions__status--reject"
                                onClick={() =>
                                  this.changeOrderStatus(
                                    item.orderId,
                                    "Rejected"
                                  )
                                }
                              >
                                Reject
                              </button>
                            </>
                          )}
                          <button
                            className="actions__status--detail"
                            onClick={() => this.detailButton(item.orderId)}
                          >
                            Detail
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="order-detail-modal"
        >
          <OrderDetail
            data={this.state.detailData}
            order={this.state.tmpOrder}
          />
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
    adminInfo: state.admin.adminInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAppMode: (payload) => dispatch(actions.changeAppMode(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrder);
