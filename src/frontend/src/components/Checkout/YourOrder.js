import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as actions from "../../store/actions";
import { connect } from 'react-redux';
 class YourOrder extends Component {

  sumCart() {
    let Carts = this.props.Carts
    let sum = 0
    Carts.map((item, key) => {
        sum = item.quantity * item.price + sum
    })
    return ((Math.round(sum * 100) / 100)).toFixed(2)
  }

  handleSaveOrder = ()=>{
    this.props.saveOrder()
  }

  render() {
    return (
      <div className='co-order'>
        <h4 className='your-order'>Your order</h4>
        <div className='list-order'>
          <div className='list-item'>           
            {
              this.props.Carts.map((item)=>{
                return <div className='item'>
                  <div><b>{item.quantity}</b> x {item.title} | {item.unit}</div>
                  <div>${item.price}</div>
                </div>
              })
            }
          </div>
        </div>
        <hr />
        <div className='list-order'>
          <div className='item-calc'>
            <span>Sub Total</span>
            <span>${this.sumCart()}</span>
          </div>
          <div className='item-calc'>
            <span>Shipping</span>
            <span>$0.00</span>
          </div>
        </div>
        <hr />
        <div className='list-order'>
          <div className='item-calc'>
            <h4>Total</h4>
            <h4>${this.sumCart()}</h4>
          </div>
        </div>
        {/* <button className='btn btn-primary btn-order btn-lg'> */}
        {
          this.props.numberCart===0?
                <button className='btn btn-primary link-order btn-lg' onClick={()=>this.handleSaveOrder()}  disabled={true}>
                  Place Order
                </button>
          :
          <Link to='/placeorder' className='btn btn-primary link-order btn-lg' onClick={()=>this.handleSaveOrder()} >
            Place Order
          </Link>
        }
        {/* </button> */}
      </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YourOrder);