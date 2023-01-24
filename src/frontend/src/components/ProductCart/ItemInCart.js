import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./ItemInCart.scss";
import Apples from "../../assets/images/Apples.jpg";
import {
  handleFindOrderById,
  handleFindProductById,
} from "../../services/productService";
class ItemInCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      quantity: this.props.item.quantity,
      max: 1000,
    };
  }
  handleUpItem = () => {
    if (this.state.quantity === this.state.max) return;
    this.props.AddCart(this.state.item);
    // this.setState({
    //     quantity: this.state.quantity + 1,
    // })
  };
  handleDownItem = () => {
    if (this.state.quantity === 0) return;
    this.props.DecreaseQuantity(this.state.item.pid);
    // this.setState({
    //     quantity: this.state.quantity - 1,
    // })
  };
  handleCloseItem = () => {
    this.props.DeleteItem(this.state.item.pid);
  };

  async componentDidMount() {
    let data = await handleFindProductById(this.props.item.pid);
    this.setState({
      max: data[0].quantity,
    });
  }

  render() {
    let { quantity } = this.state;

    //JSX
    return (
      <>
        <div className={quantity === 0 ? "cart__hide-card" : "item__cart"}>
          <div className="item__cart-add">
            <button className="item__cart-add-btn">
              <span
                className="item-btn-quatily-icon-up"
                onClick={() => this.handleUpItem()}
              >
                <i className="fas fa-plus item-btn-icon"></i>
              </span>
              <span className="item-btn-quatilt-content">{quantity}</span>

              <span
                className="item-btn-quatily-icon-down"
                onClick={() => this.handleDownItem()}
              >
                <i className="fas fa-minus item-btn-icon"></i>
              </span>
            </button>
          </div>
          <div className="item__cart-img">
            <img src={this.state.item.img} className="item__cart-image" />
          </div>
          <div className="item__cart-body">
            <div className="item__cart-infor">
              <span className="item__cart-product-title">
                {this.state.item.title}
              </span>
              <span className="item__cart-product-price">
                ${this.state.item.price}
              </span>
              <span className="item__cart-product-quantity">
                {this.state.item.quantity} X {this.state.item.unit}
              </span>
            </div>
            <div className="item__cart-total">
              <span>
                $
                {(
                  Math.round(
                    this.state.item.price * this.state.item.quantity * 100
                  ) / 100
                ).toFixed(2)}
              </span>
              <div
                className="item__cart-close"
                onClick={() => this.handleCloseItem()}
              >
                <i className="fas fa-times   item__cart-close-icon "></i>
              </div>
            </div>
          </div>
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
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (adminInfo) =>
      dispatch(actions.userLoginSuccess(adminInfo)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    AddCart: (payload) => dispatch(actions.AddCart(payload)),
    DecreaseQuantity: (payload) => dispatch(actions.DecreaseQuantity(payload)),
    DeleteItem: (payload) => dispatch(actions.DeleteItem(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemInCart);
