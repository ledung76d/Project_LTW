import React, { Component } from 'react'
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { withRouter } from "react-router-dom";
import * as actions from "../../store/actions";
import './Checkout.scss'
import Contact from './Contact'
import Shipping from './Shipping'
import Delivery from './Delivery'
import YourOrder from './YourOrder'
import { v4 as uuidv4 } from 'uuid';
import { handleSaveOrder } from '../../services/userService'
import { handleSaveToOrderItem } from '../../services/productService'
class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      userInfo: props.userInfo,
      phone: props.userInfo.phone,
      address: props.userInfo.address,
      delivery: 'Express Delivery',
    }
  }

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  setPhoneNumber = (phone) => {
    this.setState({
      phone: phone
    })
  }

  setAddress = (address) => {
    this.setState({
      address: address
    })
  }

  setDelivery = (delivery) => {
    this.setState({
      delivery: delivery
    })
  }

  placeOderButton = () => {

  }

  sumCart() {
    let Carts = this.props.Carts
    let sum = 0
    Carts.map((item, key) => {
      sum = item.quantity * item.price + sum
    })
    return Number.parseFloat(((Math.round(sum * 100) / 100)).toFixed(2))
  }

  saveOrder = async () => {
    let orderId = this.makeid(8)
    //Save order
    let order = {
      orderId: orderId,
      cid: this.state.userInfo.cid,
      status: 'Order Received',
      total: this.sumCart(),
      phone: this.state.phone,
      address: this.state.address,
      delivery: this.state.delivery
    }

    await handleSaveOrder(order)
    //Save order item

    this.props.Carts.map(async (item) => {
      // console.log('Item',item)
      item.orderId = orderId
      await handleSaveToOrderItem(item)
    })
    this.props.DeleteCart()
    //console.log( typeof orderId)
    setTimeout(() => {
      this.props.history.push('/placeorder/' + encodeURIComponent(orderId));
    }, 1000);

  }

  render() {
    return (
      <section className='co-page'>
        <div className='co-container'>
          <div className='co-list'>
            <Contact userInfo={this.state.userInfo} setPhoneNumber={this.setPhoneNumber} />
            <Shipping userInfo={this.state.userInfo} setAddress={this.setAddress} />
            <Delivery userInfo={this.state.userInfo} setDelivery={this.setDelivery} delivery={this.state.delivery} />
          </div>
          <YourOrder Carts={this.props.Carts} saveOrder={this.saveOrder} />
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    language: state.app.language,
    numberCart: state.cart.numberCart,
    Carts: state.cart.Carts,
    userInfo: state.user.userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (adminInfo) => dispatch(actions.userLoginSuccess(adminInfo)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    AddCart: (payload) => dispatch(actions.AddCart(payload)),
    DecreaseQuantity: (payload) => dispatch(actions.DecreaseQuantity(payload)),
    DeleteCart: () => dispatch(actions.DeleteCart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));