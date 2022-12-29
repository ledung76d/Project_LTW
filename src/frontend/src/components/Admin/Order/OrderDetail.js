import React from "react";
import './OrderDetail.scss';
import {handleGetUserInfoByCid} from '../../../services/userService'
class OrderDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            khachHang: null,
        }
    }

    async componentDidMount(){
        let data = await handleGetUserInfoByCid(this.props.order.cid)
        this.setState({
            khachHang: data[0]
        })
    }

    render() {
        let arrItem = this.props.data
        let order = this.props.order
        console.log('Khach hang: ',this.state.khachHang)
        return (
            <>
                <div className="OrderDetail__container">
                    <div className="OrderDetail">
                        <div className="OrderDetail__header">
                            <h3 className="OrderDetail__header-title">ORDER ID -5ZPLFXC8</h3>
                        </div>
                        <div className="OrderDetail__table">
                            <table>
                                <colgroup>
                                    <col style={{ width: "120px" }}></col>
                                    <col style={{ width: "360px" }}></col>
                                    <col ></col>
                                    <col ></col>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {arrItem?.map((item)=>{
                                        return (
                                            <tr>
                                                <td><img src={item.img} alt="" className="product-img"></img></td>
                                                <td>
                                                    <span>{item.title}</span>

                                                </td>
                                                <td>{item.quantity}</td>
                                                <td>{item.price}$</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="OrderDetail__footer">
                            <div className="Customer" >
                                <div className="OrderDetail-customer-title">Customer</div>
                                <div className="OrderDetail-customer">
                                    <span className="order-text--bold">Name:</span>
                                    <span>{this.state.khachHang?.firstName} {this.state.khachHang?.lastName}</span>
                                </div>
                                <div className="OrderDetail-customer">
                                    <span className="order-text--bold">Telephone:</span>
                                    <span>{this.state.khachHang?.phone}</span>
                                </div>
                                <div className="OrderDetail-address">
                                    <span className="order-text--bold">Shipping Address:</span>
                                    <span>{this.state.khachHang?.address}</span>
                                </div>

                            </div>

                            <div className="bill">
                                <div className="OrderDetail-bill">
                                    <span className="OrderDetail-bill-title">Sub total</span>
                                    <span className="OrderDetail-bill-price">${order.total}</span>
                                </div>
                                {/* <div className="OrderDetail-bill">
                                    <span className="OrderDetail-bill-title">Discount</span>
                                    <span className="OrderDetail-bill-price">$0.00</span>
                                </div> */}
                                <div className="OrderDetail-bill">
                                    <span className="OrderDetail-bill-title">Delivery Fee</span>
                                    <span className="OrderDetail-bill-price">$0.00</span>
                                </div>
                                <div className="OrderDetail-bill">
                                    <span className="OrderDetail-bill-title order-text--bold">Total</span>
                                    <span className="OrderDetail-bill-price order-text--bold">${order.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </>

        )

    }
}

export default OrderDetail;