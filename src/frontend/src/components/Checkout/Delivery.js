import React, { Component } from 'react'

export default class Delivery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      methodDelivery: 'Express Delivery',
    }
    this.delivery = React.createRef(null)
  }

  handleDelivery = (e) => {
    //console.log(e.target.childNodes[0].textContent)
    this.setState({
      methodDelivery: e.currentTarget.childNodes[0].textContent,
    })
    this.props.setDelivery(e.currentTarget.childNodes[0].textContent)
  }

  handleSave = () => {
    this.props.setDelivery(this.state.methodDelivery)
    this.setState({
      modal: !this.state.modal,
    })
  }

  componentDidMount() {}

  render() {
    return (
      <div className='co-delivery'>
        <div className='co-item'>
          <div className='co-item-box'>
            <span className='item-index'>3</span>
            <h3 className='item-text'>Delivery Schedule</h3>
          </div>
        </div>
        <div className='item-delivery'>
          <div
            className={`co-content h-82 ml-12 btn-div ${
              this.state.methodDelivery === 'Express Delivery' ? 'active' : null
            }`}
            onClick={(e) => this.handleDelivery(e)}
          >
            <p className='item-title'>Express Delivery</p>
            <p className='item-address'>90 min express delivery</p>
          </div>
          <div
            className={`co-content h-82 ml-12 btn-div ${
              this.state.methodDelivery === 'Morning' ? 'active' : null
            }`}
            onClick={(e) => this.handleDelivery(e)}
          >
            <p className='item-title'>Morning</p>
            <p className='item-address'>8:00 AM - 11:00 AM</p>
          </div>
          <div
            className={`co-content h-82 ml-12 btn-div ${
              this.state.methodDelivery === 'Noon' ? 'active' : null
            }`}
            onClick={(e) => this.handleDelivery(e)}
          >
            <p className='item-title'>Noon</p>
            <p className='item-address'>11:00 AM - 2:00 PM</p>
          </div>
          <div
            className={`co-content h-82 ml-12 btn-div ${
              this.state.methodDelivery === 'Afternoon' ? 'active' : null
            }`}
            onClick={(e) => this.handleDelivery(e)}
          >
            <p className='item-title'>Afternoon</p>
            <p className='item-address'>2:00 PM - 5:00 PM</p>
          </div>
          <div
            className={`co-content h-82 ml-12 btn-div ${
              this.state.methodDelivery === 'Evening' ? 'active' : null
            }`}
            onClick={(e) => this.handleDelivery(e)}
          >
            <p className='item-title'>Evening</p>
            <p className='item-address'>5:00 PM - 8:00 PM</p>
          </div>
        </div>
      </div>
    )
  }
}
