import React, { Component } from "react";
import "./PlaceOrder.scss";
import { Link, withRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  handleFindOrderById,
  handleFindProductById,
} from "../../services/productService";
class PlaceOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItem: null,
      orderId: "",
      createdAt: null,
      total: null,
      address: null,
      phone: null,
      total: null,
      delivery: null,
      status: null,
      arr: [],
    };
  }

  makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async componentDidMount() {
    let data;
    try {
      let orderData = await handleFindOrderById(this.props.match.params.id);
      data = [...orderData];
      // console.log("Data", data);
    } catch (error) {
      if (data.length === 0) {
        this.props.history.push("/");
        return;
      }
      //console.log('Data',data)
      //Gan them push vao de tranh th data = null
    } finally {
    }
    const findID = async (id) => {
      const item = await handleFindProductById(id);
      return item;
    };

    setTimeout(() => {
      data.forEach((item) => {
        let product = findID(item.pid);
        product
          .then((data) => {
            const info = { ...data[0] };
            info.quantity = item.quantity;
            info.price = item.price;
            this.setState({ arr: [info, ...this.state.arr] });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }, 2000);

    // console.log('Arr', arr)
    // console.log('Data', data)
    setTimeout(() => {
      if (data[0]?.length === 0) {
        this.props.history.push("/");
        return;
      }
    }, 10000);
    this.setState({
      orderItem: data,
      orderId: data[0]?.orderId,
      createdAt: data[0]?.createdAt,
      total: data[0]?.total,
      address: data[0]?.address,
      phone: data[0]?.phone,
      delivery: data[0]?.delivery,
      status: data[0]?.status,
      // arr: arr,
    });

    //console.log(this.props.match.params.id)
  }

  render() {
    // console.log("Render: ", this.state.arr);
    return (
      <section className="ph-page">
        <div className="ph-container">
          <div className="ph-status">
            <div className="status">
              <h6 className="status-title">Status: </h6>
              <div className="status-order">
                <p>{this.state.status}</p>
              </div>
            </div>
            <Link to="/">Back to Home</Link>
            {/* <a href=''>Back to Home</a> */}
          </div>
          <div className="ph-order">
            <div className="order-info">
              <h3 className="info-title">Order Number</h3>
              <p className="info-content">{this.state.orderId}</p>
            </div>
            <div className="order-info">
              <h3 className="info-title">Date</h3>
              <p className="info-content">
                {new Date(this.state.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="order-info">
              <h3 className="info-title">Total</h3>
              <p className="info-content">${this.state.total}</p>
            </div>
            <div className="order-info">
              <h3 className="info-title">Payment Method</h3>
              <p className="info-content">cod</p>
            </div>
          </div>
          <div className="ph-details">
            <div className="total-amount">
              <h2 className="detail-heading">Total Amount</h2>
              <div className="mb-15">
                <strong className="detail-body">Sub Total</strong>
                <span className="detail-info pl-62">${this.state.total}</span>
              </div>
              <div className="mb-15">
                <strong className="detail-body">Shipping Charge</strong>
                <span className="detail-info">$0.00</span>
              </div>
              {/* <div className='mb-15'>
                <strong className='detail-body'>Discount</strong>
                <span className='detail-info pl-66'>$0.00</span>
              </div> */}
              <div className="mb-15">
                <strong className="detail-body">Total</strong>
                <span className="detail-info pl-91">${this.state.total}</span>
              </div>
            </div>
            <div className="order-details">
              <h2 className="detail-heading">Order Details</h2>
              <div className="mb-15">
                <strong className="detail-body">Total Item</strong>
                <span className="detail-info pl-40">
                  {this.state.arr.reduce(
                    (totalItem, item) => totalItem + item.quantity,
                    0
                  )}{" "}
                  Items
                </span>
              </div>
              <div className="mb-15">
                <strong className="detail-body">Delivery Time</strong>
                <span className="detail-info">11:00 AM - 2:00 PM</span>
              </div>
              <div className="mb-15">
                <strong className="detail-body">Shipping Address</strong>
                <div className="ship">
                  <span className="detail-address">{this.state.address}</span>
                </div>
              </div>
            </div>
          </div>
          <table className="table bgc-grey">
            <thead>
              <tr>
                <th className="w-58">Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
          </table>
          <div className="ph-items overflow-auto">
            <table className="table table-borderless">
              <tbody>
                {this.state.arr.map((item) => {
                  //console.log('Item', item)
                  return (
                    <tr key={uuidv4()}>
                      <td>
                        <div className="list-items">
                          <img src={item.img} alt={item.title} />
                          <div className="item-info">
                            <span className="item-name">
                              {item.title} x{" "}
                              <span className="item-unit">{item.unit}</span>
                            </span>
                            <span className="item-price">${item.price}</span>
                          </div>
                        </div>
                      </td>
                      <td>{item.quantity}</td>
                      <td className="text-center">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* <div className='ph-sub-orders'>
            <h2 className='detail-heading'>Sub Order</h2>
            <div className='box-note'>
              <div className='box-icon'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20.894'
                  height='16'
                  viewBox='0 0 20.894 16'
                  className='w-2 h-2 text-light flex-shrink-0'
                  className='checkbox-icon'
                >
                  <path
                    data-name='_ionicons_svg_ios-checkmark (3)'
                    d='M169.184,175.473l-1.708-1.756a.367.367,0,0,0-.272-.116.352.352,0,0,0-.272.116l-11.837,11.925-4.308-4.308a.375.375,0,0,0-.543,0l-1.727,1.727a.387.387,0,0,0,0,.553l5.434,5.434a1.718,1.718,0,0,0,1.135.553,1.8,1.8,0,0,0,1.126-.534h.01l12.973-13.041A.415.415,0,0,0,169.184,175.473Z'
                    transform='translate(-148.4 -173.6)'
                    fill='currentColor'
                  ></path>
                </svg>
              </div>
              <p className='note-content'>
                <h6>Note</h6>: This order has products from multiple vendors. So
                we divided this order into multiple vendor orders
              </p>
            </div>
            <table className='table bgc-grey'>
              <thead>
                <tr>
                  <th className='w-25'>Tracking Number</th>
                  <th className='w-21'>Date</th>
                  <th className='w-22'>Status</th>
                  <th className='w-9'>Item</th>
                  <th>Total Price</th>
                  <th></th>
                </tr>
              </thead>
            </table>
            <div className='ph-sub overflow-auto'>
              <table className='table table-borderless'>
                <tbody>
                  <tr>
                    <td>bVH8G97r6wSC</td>
                    <td>January 6, 2022</td>
                    <td>
                      <div className='status-order'>
                        <p>Order Received</p>
                      </div>
                    </td>
                    <td>6 Items</td>
                    <td>$21.60</td>
                    <td>
                      <button className='btn btn-dark btn-custom'>View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
      </section>
    );
  }
}

export default withRouter(PlaceOrder);
