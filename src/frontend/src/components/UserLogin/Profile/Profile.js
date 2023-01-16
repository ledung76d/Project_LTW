import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { push } from "connected-react-router";
import './Profile.scss';
import { Link } from 'react-router-dom'
import {
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
} from 'reactstrap'

import {cloudinaryUpload,changeFLA} from '../../../services/userService'
import userImg from '../../../assets/images/admin/avatar-placeholder.svg'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalContact: false,
            modalAddress: false,
            img: '',
            firstName: '',
            lastName: ''
        }
    }

    componentDidMount(){
        this.setState({
            img: this.props.userInfo.picture,
            firstName: this.props.userInfo.firstName,
            lastName: this.props.userInfo.lastName
        })
    }

    onChangeInputImage = async (e)=>{
        let uploadData  = new FormData()
        uploadData.append('file',e.target.files[0],"file")
        let tmp = await cloudinaryUpload(uploadData)
        //console.log('Link',tmp)
        this.setState({
            img: tmp.secure_url
        })
    }

    handleLogout = ()=>{
        this.props.processLogout()      
        this.props.navigate('/')
         
    }

    handleFirstNameOnChange = (e)=>{
        this.setState({
            firstName: e.target.value
        })
    }

    handleLastNameOnChange = (e)=>{
        this.setState({
            lastName: e.target.value
        })
    }

    saveFLA = async ()=>{
        let data = {
            cid: this.props.userInfo.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            image: this.state.img
        }
        console.log('data: ',data)
        let tmp =   await changeFLA(data)
        this.props.reduxChangeFLA(data)
    }

    render() {
        let { titleProduct, removeSearchData, checkDropdow } = this.state;
        console.log(">>check ", this.state.modalContact)
        return (
            <>
                <div className='container__profile'>
                    <div className='userLogin'>
                        <div className='user__wallet'>
                            <h3 className='user__wallet-title'>Wallet</h3>
                            <div className='user__wallet-list'>
                                <div className='user__wallet-list-item'>
                                    <span>Total Points</span>
                                    <span>0</span>
                                </div>
                                <div className='user__wallet-list-item'>
                                    <span>Points Used</span>
                                    <span>0</span>
                                </div>
                                <div className='user__wallet-list-item'>
                                    <span>Available Points</span>
                                    <span>0</span>
                                </div>
                            </div>
                        </div>
                        <div className='user_sidebar'>
                            <ul className='user_sidebar-list'>
                                <li className='user_sidebar-list-item'>

                                    <Link to={'/profile'} className="user_sidebar-list-item-link user_sidebar-list-item-link-profile"><span>Profile</span></Link>
                                </li>
                                <li className='user_sidebar-list-item'>

                                    <Link to={'/change-password'} className="user_sidebar-list-item-link "><span>Change Password</span></Link>

                                </li>
                                <li className='user_sidebar-list-item'>

                                    <Link to={'/my-order'} className="user_sidebar-list-item-link"><span>My Orders</span></Link>
                                </li>
                                <li className='user_sidebar-list-item'>
                                    <a className='user_sidebar-list-item-link'>
                                        My Refunds
                                    </a>
                                </li>
                                <li className='user_sidebar-list-item'>
                                    <a className='user_sidebar-list-item-link'>
                                        Need Help
                                    </a>
                                </li>

                            </ul>
                            <div className='user_sidebar-logout' onClick={(e)=>this.handleLogout(e)}>
                                <a className='user_sidebar-logout-link'>
                                    Logout
                                </a>

                            </div>

                        </div>
                    </div>

                    <div className='userLogin__profile'>
                        <div className='profile__infor'>

                            <div className='profile__infor-avatar'>
                                <label htmlFor="avatar" className='profile__infor-avatar-title'>
                                    <i className="fas fa-cloud-upload-alt avatar_upload-icon"></i>
                                    <br />
                                    <span className='avatar-title-bold'>UpLoad an image</span>
                                    &nbsp; or drag and drop
                                    <br></br>
                                    <span>PNG, JPG</span>
                                </label>

                                <input type="file"
                                    id="avatar" name="avatar"
                                    accept="image/png, image/jpeg"
                                    className='profile__infor-avatar-input'
                                    onChange={(e)=>this.onChangeInputImage(e)}
                                />
                            </div>
                            <div className='avatar-img'>
                                <img src={this.state.img} alt='' width="100" height="100" />
                            </div>
                            <div className='profile__infor-form'>
                                <label className='profile__infor-title' htmlFor='profile__infor-name'>First Name</label>
                                <input className='profile__infor-input' id='profile__infor-name' value={this.state.firstName} onChange={(e)=>this.handleFirstNameOnChange(e)}></input>
                            </div>
                            <div className='profile__infor-form'>
                                <label className='profile__infor-title' htmlFor='profile__infor-name'>Last Name</label>
                                <input className='profile__infor-input' id='profile__infor-name' value={this.state.lastName} onChange={(e)=>this.handleLastNameOnChange(e)} ></input>
                            </div>
                            {/* <div className='profile__infor-form'>
                                <label className='profile__infor-title' htmlFor='profile__infor-bio'>Bio</label>
                                <textarea className='profile__infor-text' id='profile__infor-bio'></textarea>
                            </div> */}
                            <div className='profile__infor-btn'>
                                <button className='profile__infor-btn--save' onClick={()=>this.saveFLA()}>Save</button>
                            </div>
                        </div>
                        <div className='profile__contact'>
                            <div className='profile__contact-header'>
                                <span className='profile__contact-header-title'>Contact Number</span>
                                <button className='profile__contact-header-btn'
                                    onClick={() => this.setState({ modalContact: !this.state.modalContact })}
                                >+ Update</button>

                            </div>
                            <div className='profile__contact-phone'>
                                <span>19365141641631</span>
                            </div>

                        </div>
                        <div className='profile__contact'>
                            <div className='profile__contact-header'>
                                <span className='profile__contact-header-title'>Addresses</span>
                                <button className='profile__contact-header-btn'
                                    onClick={() => this.setState({ modalAddress: !this.state.modalAddress })}

                                >+ Add</button>

                            </div>
                            <div className='profile__address'>
                                <div className='profile__address-bill'>
                                    <p className='profile__address-title'>Billing</p>
                                    <p className='profile__address-content'>2231 Kidd Avenue, AK, Kipnuk, 99614, United States</p>
                                </div>
                                <div className='profile__address-bill'>
                                    <p className='profile__address-title'>Billing</p>
                                    <p className='profile__address-content'>2231 Kidd Avenue, AK, Kipnuk, 99614, United States</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <Modal
                    toggle={() => this.setState({ modalContact: !this.state.modalContact })}
                    isOpen={this.state.modalContact}
                    centered
                    className='contact-modal'
                >
                    <div className='profile__update-contact'>
                        <p className='profile__update-contact-title'>Add New Contact Number</p>
                        <div className='profile__update-contacts'>
                            <input type='tel' className='profile__update-contact-input'></input>
                            <button className='profile__update-contact-btn'>Send OTP</button>
                        </div>

                    </div>
                </Modal>
                <Modal
                    toggle={() => this.setState({ modalAddress: !this.state.modalAddress })}
                    isOpen={this.state.modalAddress}
                    centered
                    className='address-modal'
                >
                    <form className='form__address'>
                        <h3 className='form__address-title'>Add New Address</h3>
                        <div className='form__address-radio'>
                            <p className='form__address-radio-title'>Type</p>
                            <div className='form__address-radio-group'>
                                <input type='radio' name='address-radio-type' id="Billing" />
                                <label className='address-radio-type-label' htmlFor='Billing'>Billing</label>

                                <input type='radio' name='address-radio-type' id="Shipping" />
                                <label className='address-radio-type-label' htmlFor='Shipping'>Shipping</label>
                            </div>

                        </div>

                        <div className='form__address-item'>
                            <label className='form__address-item-title'>Title</label>
                            <input className='form__address-item-input' />
                        </div>
                        <div className='form__address-group' >

                            <div className='form__address-item'>
                                <label className='form__address-item-title'>Country</label>
                                <input className='form__address-item-input' />
                            </div>
                            <div className='form__address-item'>
                                <label className='form__address-item-title'>City</label>
                                <input className='form__address-item-input' />
                            </div>
                        </div>


                        <div className='form__address-group' >
                            <div className='form__address-item'>
                                <label className='form__address-item-title'>State</label>
                                <input className='form__address-item-input' />
                            </div>
                            <div className='form__address-item'>
                                <label className='form__address-item-title'>Zip</label>
                                <input className='form__address-item-input' />
                            </div>

                        </div>

                        <div className='form__address-item'>
                            <label className='form__address-item-title'>Street Address</label>
                            <textarea className='form__address-item-text'></textarea>
                        </div>
                        <button className='form__address-btn'>Save Address</button>
                    </form>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        navigate: (path) => dispatch(push(path)),
        reduxChangeFLA: (payload)=>dispatch(actions.changeFLA(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);