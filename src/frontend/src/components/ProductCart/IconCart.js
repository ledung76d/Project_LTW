import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './ProductCart.scss'
import NoProduct from '../../assets/images/zyro-image.png'
import ItemInCart from './ItemInCart';
import { v4 as uuidv4 } from 'uuid';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class IconCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            checkOutRight: false,
        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            checkOutRight: true,
        });
    };



    sumCart() {
        let Carts = this.props.Carts
        let sum = 0
        Carts.map((item, key) => {
            sum = item.quantity * item.price + sum
        })
        return ((Math.round(sum * 100) / 100)).toFixed(2)
    }

    checkOutBtn = () => {
        if (this.props.isLoggedIn === true) {
            this.props.navigate('/checkout')
        }
        else {
            toast.error('You must login to buy something!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    render() {
        let { modal, checkOutRight } = this.state;
        //JSX
        return (
            <>
                <button className='cart-icon'
                    onClick={() => this.toggle()}
                >

                    <span className={this.props.numberCart > 0 ? 'cart-icon-quatily' : 'cart__hide-card'}>{this.props.numberCart}</span>


                    <i className="fas fa-shopping-bag"></i>
                </button>
                {modal === true ?
                    <div className='cart-modal '>
                        <div className={'modal__overlay'}
                            onClick={() => this.toggle()}
                        ></div>

                        <div className={'modal__body'}>
                            <div className=' modal__inner'>
                                <div className='cart__header'>
                                    <div className='cart__header-quantity'>
                                        <i className="fas fa-shopping-bag cart__header-quantity-icon"></i>
                                        <span className='cart__header-quantity-item'>{this.props.numberCart} Item</span>
                                    </div>
                                    <button className='cart__header-btn'
                                        onClick={() => this.toggle()}
                                    >
                                        <i className="fas fa-times cart__header-btn-icon"></i>
                                    </button>
                                </div>


                                <div className='cart__body'>

                                    {this.props.numberCart === 0 ?
                                        <div className='cart__body-noproduct'>
                                            <img src={NoProduct} className='cart__body-noproduct-img' />
                                            <div className='cart__body-noproduct-title'>No products found</div>
                                        </div>
                                        :
                                        <>
                                            <div className='cart__body-item'>
                                                {this.props.Carts.map((item) => {
                                                    return <ItemInCart item={item} key={uuidv4()} />
                                                })}
                                            </div>
                                            <div className='cart__body-item--not'>

                                            </div>
                                        </>
                                    }



                                </div>

                                <div className='cart__footer'>
                                    {/* <Link to={'/checkout'} className='cart__footer-btn' disabled={this.props.isLoggedIn?false: true}>
                                        <span className='cart__footer-btn-title' >Checkout</span>
                                        <span className='cart__footer-btn-price'>${this.sumCart()}</span>
                                    </Link> */}
                                    <button className='cart__footer-btn' onClick={() => this.checkOutBtn()}>
                                        <span className='cart__footer-btn-title'>Checkout</span>
                                        <span className='cart__footer-btn-price'>${this.sumCart()}</span>
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                    :
                    <div className={checkOutRight === true ? 'cart-modal__outRight' : ''}></div>
                }

            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        numberCart: state.cart.numberCart,
        Carts: state.cart.Carts,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (adminInfo) => dispatch(actions.userLoginSuccess(adminInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconCart);