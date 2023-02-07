import React, { Component } from "react";
import "./Analysis.scss";
import Chart from "./Chart";
import adminService from "../../../services/adminService";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import LineChart from "./LineChart";
import { v4 as uuidv4 } from "uuid";

class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      chartData: null,
      lineChartData: {
        labels: ["January", "February"],
        datasets: [
          {
            label: "Sales",
            data: [0, 0],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "Order",
            data: [0, 0],
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
          {
            label: "Quantity",
            data: [0, 0],
            borderColor: "rgb(255, 200, 0)",
            backgroundColor: "rgba(255, 215, 0, 0.5)",
          },
        ],
      },
      total30day: 0,
      order30day: 0,
      totalRevenue: 0,
      countNumber: 0,
      popularProduct: [],
    };
  }
  async componentDidMount() {
    let data = await adminService.handleTotal30day();
    // let data1 = await adminService.handleOrder30day();
    let data2 = await adminService.handleTotalRevenue();
    // let data3 = await adminService.handleGetProductBySid(
    //   this.props.adminInfo.sid
    // );
    let data4 = await adminService.handlePopularProduct();
    let dataAnalysis = await adminService.handleGetAnalysisStore();
    console.log("dataAnalysis", dataAnalysis);
    this.setState({
      total30day: data[0].total,
      order30day: dataAnalysis.totalOrder,
      totalRevenue: data2[0].total,
      countNumber: dataAnalysis.totalNewProduct,
      popularProduct: data4.data,
    });
    const labelData = data4.data.map((item) => item.product.title);
    const datasets = data4.data.map((item) => item.total);
    console.log("helo=", labelData);
    const chartData = {
      labels: labelData,
      datasets: [
        {
          label: "Quantity",
          data: datasets,
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
            "rgba(60, 179, 113, 0.8)",
            "rgba(238, 130, 238, 0.8)",
            "rgba(0, 0, 255, 0.8)",
            "rgba(255, 0, 0, 0.8)",
            "rgba(255, 165, 0, 0.8)",
            "rgba(106, 90, 205, 0.8)",
          ],
        },
      ],
    };
    this.setState({ chartData: chartData });
    const lineChartData = {
      labels: ["January", "February"],
      datasets: [
        {
          label: "Sales",
          data: [0, dataAnalysis.totalSales],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Order",
          data: [0, dataAnalysis.totalOrder],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          label: "Quantity",
          data: [0, dataAnalysis.totalQuantity],
          borderColor: "rgb(255, 200, 0)",
          backgroundColor: "rgba(255, 215, 0, 0.5)",
        },
      ],
    };
    this.setState({
      lineChartData: lineChartData,
    });
  }

  render() {
    return (
      <>
        <div className="analysis__container">
          <div className="analysis__header">
            <div className="analysis__header-total">
              <div className="total-title">
                <span className="total-title--bold">Total Revenue</span>
                {/* <span className='total-title--gray'>(Last 30 Days)</span> */}
              </div>
              <div className="analysis__header-logo">
                <span className="analysis__header-logo-total  text-color--green">
                  ${this.state.totalRevenue}
                </span>

                <div className="total-revenue">
                  <i className="fas fa-dollar-sign header-logo-icon  text-color--green"></i>
                </div>
              </div>
            </div>
            <div className="analysis__header-total">
              <div className="total-title">
                <span className="total-title--bold">Total Order </span>
                <span className="total-title--gray">(Last 30 Days)</span>
              </div>
              <div className="analysis__header-logo">
                <span className="analysis__header-logo-total text-color--red ">
                  {this.state.order30day}
                </span>

                <div className="total-order">
                  <i className="fas fa-cart-arrow-down header-logo-icon text-color--red"></i>
                </div>
              </div>
            </div>
            <div className="analysis__header-total">
              <div className="total-title">
                <span className="total-title--bold ">Todays Revenue </span>
                <span className="total-title--gray">(Last 30 Days)</span>
              </div>
              <div className="analysis__header-logo">
                <span className="analysis__header-logo-total text-color--orange">
                  ${this.state.total30day}
                </span>

                <div className="todays-revenue">
                  <i className="fas fa-hand-holding-usd header-logo-icon text-color--orange"></i>
                </div>
              </div>
            </div>
            <div className="analysis__header-total">
              <div className="total-title">
                <span className="total-title--bold">Total Product </span>
                <span className="total-title--gray">(Last 30 Days)</span>
              </div>
              <div className="analysis__header-logo">
                <span className="analysis__header-logo-total text-color--blue ">
                  {this.state.countNumber}
                </span>
                <div className="total-product">
                  <i className="fas fa-store header-logo-icon text-color--blue "></i>
                </div>
              </div>
            </div>
          </div>
          <div className="analysis__body">
            <LineChart data={this.state.lineChartData} key={uuidv4()} />
          </div>
          <div className="analysis__footer">
            <h3 className="analysis__footer-title">Popular Products</h3>

            <table className="analysis__footer-table">
              <colgroup>
                <col style={{ width: "10%" }}></col>
                <col style={{ width: "30%" }}></col>
                <col></col>
                <col style={{ width: "20%" }}></col>
                <col></col>
                <col style={{ width: "10%" }}></col>
              </colgroup>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Group</th>
                  <th>Shop</th>
                  <th>Price/Unit</th>
                  <th>Sold Product</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {this.state.popularProduct?.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.product.title}</td>
                      <td>Grocery</td>
                      <td>Grocery Shop</td>
                      <td>{item.product.price}</td>
                      <td>{item.total}</td>
                      <td>{item.product.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {this.state.chartData && (
            <div className="analysis__body">
              <Chart chartData={this.state.chartData} key={uuidv4()} />
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.admin.isLoggedIn,
    adminInfo: state.admin.adminInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAppMode: (payload) => dispatch(actions.changeAppMode(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Analysis);
