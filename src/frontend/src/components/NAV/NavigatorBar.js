import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './NavigatorBar.scss';
import LogoShop from '../../assets/images/PickBazar.png';
import Login from '../Auth/Login';
import { Link } from 'react-router-dom'

class NavigatorBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleProduct: '',
            removeSearchData: false,
            checkDropdow: false,

        }
    }


    handleChangeSearchTitleProduct = (event) => {
        console.log(">>> on change", this.state)
        if (event.target.value === '') {
            this.setState({
                titleProduct: event.target.value,
                removeSearchData: false,
            })
            return;
        }
        this.setState({
            titleProduct: event.target.value,
            removeSearchData: true,
        })
    }
    handleSearchTitleProduct = () => {
        console.log(">>> check Search bar")
    }
    handleRemoveTitleProduct = () => {
        console.log(">>> check remove");
        this.setState({
            titleProduct: "",
            removeSearchData: false,
        })

    }
    handleButtonDropdown = () => {
        this.setState({
            checkDropdow: !this.state.checkDropdow,
        })
        console.log('>>> check dropdown', this.state.checkDropdow)
    }


    render() {
        let { titleProduct, removeSearchData, checkDropdow } = this.state;
        //JSX
        return (
            <>
                <div className="app">
                    <header className="header">
                        <div className="">
                            <nav className="header__navbar">
                                <ul className="header__navlist-list">
                                    <li className="header__navbar-item header__navbar-item--separate">
                                        <Link to='/' >
                                            <img className='header__navbar-item-logo' src={LogoShop} />
                                        </Link>
                                    </li>
                                    {/*  <li className="header__navbar-item">
                                        <button className='header__navbar-item-btn '
                                            onClick={() => this.handleButtonDropdown()}>
                                            <i className="far fa-lemon "></i>
                                            <span>Grocery</span>
                                            <i className={checkDropdow ? 'fas fa-caret-up' : "fas fa-caret-down"}></i>
                                        </button>
                                        <ul className={checkDropdow ? 'header__navbar-item-btn-list' : ' tag-display-none  header__navbar-item-btn-list'}>
                                            <li className='header__nabar-item-btn-list-store'>
                                                <i className="far fa-lemon "></i>

                                                <a>Grocery</a>
                                            </li>
                                            <li className='header__nabar-item-btn-list-store'>
                                                <i className="far fa-lemon "></i>

                                                <a>Bakery</a>
                                            </li>
                                            <li className='header__nabar-item-btn-list-store'>
                                                <i className="far fa-lemon "></i>

                                                <a>Makeup</a>
                                            </li>
                                            <li className='header__nabar-item-btn-list-store'>
                                                <i className="far fa-lemon "></i>

                                                <a>Bags</a>
                                            </li>
                                        </ul>
                                    </li> */}
                                </ul>

                                <ul className="header__navlist-list">
                                    <li className="header__navbar-item">
                                        <Link to={'/'} className="header__navbar-item-link"><span>Shops</span></Link>
                                    </li>
                                    <li className="header__navbar-item">
                                        <a href="" className="header__navbar-item-link">
                                            <span>Offers</span>
                                        </a>
                                    </li>
                                    <li className="header__navbar-item header__navbar-item--separate">

                                        <Link to={'/faq'} className="header__navbar-item-link"><span>FAQ</span></Link>

                                    </li>
                                    <li className="header__navbar-item ">
                                        <Link to={'/contact'} className="header__navbar-item-link" >
                                            <span>Contact</span>
                                        </Link>
                                    </li>
                                    <li className="header__navbar-item text--strong">
                                        {/* <button type="button" className="btn btn-danger" style={{width: '50px',height: '30px'}} onClick={()=>this.handleShowLogin()} >Join</button> */}
                                        <Login />
                                    </li>

                                </ul>
                            </nav>
                        </div>

                    </header>

                    <div className="container">

                    </div>

                    <footer className="footer">

                    </footer>
                </div >
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigatorBar);