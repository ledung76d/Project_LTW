import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Bill.scss";
import { handleFindOrderById } from "../../services/productService";
import { v4 as uuidv4 } from "uuid";
import { handleFindProductById } from "../../services/productService";
import "./MyOders.scss";
class BillHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item } = this.props;
    return (
      <>
        <div className="Order-Details">
          <div className="title">
            <h4>
              Order Details
              <span>-</span>
              {item?.orderId}
            </h4>
            <div>
              <button>
                <i className="far fa-frown"></i>
                Ask for a refund
              </button>
              <a>
                <i className="fas fa-eye"></i>
                Sub Orders
              </a>
            </div>
          </div>
          <div className="Add_Total">
            <div className="Address">
              <div className="Shipping_Add">
                <div className="Shipping">Shipping Address</div>
                <span>{item?.address}</span>
              </div>
            </div>
            <div className="Total">
              <div>
                <span>Sub Total</span>
                <span> ${item?.total}</span>
              </div>

              <div>
                <span>Delivery Fee</span>
                <span> $0.00</span>
              </div>

              <div className="total">
                <span>Total</span>
                <span> ${item?.total}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BillHeader;
