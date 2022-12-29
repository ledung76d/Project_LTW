import React, { Component } from 'react'
import NavigatorBar from '../NAV/NavigatorBar'
import Checkout from './Checkout'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class CheckoutOrder extends Component {
  render() {
    return (
      <>
        {/* <NavigatorBar /> */}
        <Checkout />
      </>
      //   <Provider store={store}>
      //   </Provider>
    )
  }
}

export default CheckoutOrder
