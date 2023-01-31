import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Modal } from "reactstrap";
import * as actions from "../../store/actions";
import "./ViewProduct.scss";
import ViewProductDetail from "./ViewProductDetail";

class ViewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      quatily: 0,
      modal: false,
    };
  }
  handleMinusItem = () => {
    if (this.state.quatily === 0) {
      return;
    }
    this.props.DecreaseQuantity(this.state.product.pid);
    let quatilyItem = this.state.quatily - 1;
    this.setState({
      quatily: quatilyItem,
    });
  };
  handleAddItem = () => {
    console.log(
      `Hien tai: ${this.state.quatily} Tong: ${this.state.product.quantity}`
    );
    if (this.state.quatily === this.state.product.quantity) return;
    this.props.AddCart(this.state.product);
    let quatilyItem = this.state.quatily + 1;
    this.setState({
      quatily: quatilyItem,
    });
  };
  toggle = () => {
    //console.log(">>> check toggle ");
    this.setState({
      modal: !this.state.modal,
    });
  };

  componentWillReceiveProps(nextProps) {
    //console.log('Hello',nextProps)
    if (this.props.numberCart !== nextProps.numberCart) {
      let id = this.state.product.pid;
      let quantity = 0;
      nextProps.Carts.map((item, key) => {
        if (item.pid === id) {
          quantity = item.quantity;
        }
      });
      this.setState({
        quatily: quantity,
      });
    }
  }

  render() {
    let { product, quatily } = this.state;

    console.log(`check view product:${this.props.product}`);
    //JSX
    return (
      <>
        <div className="product-container">
          <div
            className={
              product.discount === 0
                ? "product-item-displaynon"
                : "item-product-discount"
            }
          >
            <div className="">{product.discount}%</div>
          </div>
          <img
            src={product.img}
            className="item-image "
            onClick={() => this.toggle()}
          />
          <Modal
            funk="true"
            isOpen={this.state.modal}
            toggle={() => this.toggle()}
            className="item-product-modal"
          >
            <ViewProductDetail product={this.props.product} />
          </Modal>

          <div className="item-info">
            <div className="item-price">
              {product.discount === 0 ? (
                <span className="">
                  ${Math.round(product.price * 100) / 100}
                </span>
              ) : (
                <>
                  <span className="">
                    $
                    {(
                      (Math.round(product.price * 100) / 100) *
                      (1 - product.discount / 100)
                    ).toFixed(2)}
                    &nbsp;&nbsp;&nbsp;
                  </span>
                  <span className="item-price-discount">
                    <span className=" item-price-line"></span>${product.price}
                  </span>
                </>
              )}
            </div>
            <div className="item-name">
              <span>{product.title}</span>
            </div>

            <button
              className={
                quatily === 0
                  ? "item-btn-quatily"
                  : "item-btn-quatily item-btn-quatily-active"
              }
            >
              <span
                className="item-btn-quatily-icon-minus"
                onClick={() => this.handleMinusItem()}
              >
                <i className="fas fa-minus item-btn-icon"></i>
              </span>
              <span className="item-btn-quatilt-content">
                {quatily === 0 ? "Add" : quatily}
              </span>
              <span
                className="item-btn-quatily-icon-add"
                onClick={() => this.handleAddItem()}
              >
                <i className="fas fa-plus item-btn-icon"></i>
              </span>
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    numberCart: state.cart.numberCart,
    Carts: state.cart.Carts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (adminInfo) =>
      dispatch(actions.userLoginSuccess(adminInfo)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    AddCart: (payload) => dispatch(actions.AddCart(payload)),
    DecreaseQuantity: (payload) => dispatch(actions.DecreaseQuantity(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);
