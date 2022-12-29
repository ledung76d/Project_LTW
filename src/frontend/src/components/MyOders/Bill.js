import React from "react";
import {
    NavLink,
    Link
} from "react-router-dom";
import './Bill.scss'
import {handleFindOrderById} from '../../services/productService'
import { v4 as uuidv4 } from 'uuid';
import {handleFindProductById} from '../../services/productService'
class Bill extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arr: null
        }
    }

    getProduct  = async (pid)=>{
        let data = await handleFindProductById(pid)
        return data
    }

    async componentDidMount(){
        let orderId = this.props.orderId
        if (orderId===null) return
        console.log('OrderId: ',this.props)
        let data  = await handleFindOrderById(orderId)
        console.log('Get order from db: ',data)
        let tempArr= []
        data.forEach(item => {
            let tempItem  = this.getProduct(item.pid)
            tempItem
                    .then((product)=>{
                        let temp = {...product[0]}
                        temp.quantity  = item.quantity
                        temp.price=item.price
                        tempArr.push(temp)
                    })
        });
        console.log('Temparr: ',tempArr)
        this.setState({
            arr: tempArr
        })
    }

    async componentWillReceiveProps(nextProps){
        if(nextProps.orderId !== this.props.orderId){
            let orderId = nextProps.orderId
            //console.log('OrderId: ',this.props)
            let data  = await handleFindOrderById(orderId)
            //console.log('Get order from db: ',data)
            let tempArr= []
            data.forEach(item => {
                let tempItem  = this.getProduct(item.pid)
                tempItem
                        .then((product)=>{
                            let temp = {...product[0]}
                            temp.quantity  = item.quantity
                            temp.price=item.price
                            tempArr.push(temp)
                        })
            });
            //console.log('Temparr: ',tempArr)
            this.setState({
                arr: tempArr
            })
        }
    }

    render() {
        return (
            <>
                <div className="Container_Items">
                    {this.state.arr?.map( (temp,key)=>{
                        return (
                            <div className="container_Item" key={uuidv4()}>
                                <div className="View_Item">
                                    <div>
                                        <img src={temp.img}></img>
                                    </div>
                                    <div className="name_price">
                                        <div className="img_text">
                                            <div className="name_item">{temp.title} x</div>
                                            <span>{temp.unit}</span>
                                        </div>
                                        <span className="price_item">${temp.price}</span>
                                    </div>
                                </div>
                                <div className="View_Quantity">
                                    <p>{temp.quantity}</p>
                                </div>
                                <div className="View_Price">
                                    <p>${temp.price}</p>
                                </div>
                            </div>       
                        )
                    })}
                </div>
            </>
        )
    }
}

export default Bill