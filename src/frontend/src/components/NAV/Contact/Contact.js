import React from "react";
import "./Contact.scss"
class Contact extends React.Component {

    render() {
        return (
            <>


                <div className="full-window">
                    <div className='fake__navbar'></div>
                    <div className="container__contact">
                        <div className="contact__shop">
                            <div className="contact__shop-img">
                                <img src="https://pickbazar-react-rest.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fsrc%2Fassets%2Fcontact-illustration.d03e6026d8e2aacf97c45d6a67c24857.svg&w=384&q=75" />
                            </div>
                            <div className="contact__shopInfor">
                                <span className="contact__shopInfor-title">Address</span>
                                <span className="contact__shopInfor-content">Ha Noi, Viet Nam</span>
                            </div>
                            <div className="contact__shopInfor">
                                <span className="contact__shopInfor-title">Phone</span>
                                <span className="contact__shopInfor-content">+129290122122</span>
                            </div>
                            <div className="contact__shopInfor">
                                <span className="contact__shopInfor-title">Website</span>
                                <div className="contact__shopInfor-linkweb">
                                    <span className="contact__shopInfor-content">https://omicrom</span>
                                    <a>Visit This Site</a>
                                </div>
                            </div>
                            <div className="contact__shopInfor">
                                <span className="contact__shopInfor-title">Follow Us</span>
                                <div className="contact__shopInfor-link">
                                    <a className="shopInfor-link-icon">
                                        <i className="fab fa-facebook-square"></i>
                                    </a>
                                    <a className="shopInfor-link-icon">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a className="shopInfor-link-icon">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="contact__survey">
                            <h1 className="contact__survey-title">Questions, Comments, Or Concerns?</h1>
                            <form className="survey-form">
                                <div className="survey-form-header">
                                    <div >
                                        <label className="contact__survey-input-Title">Name</label>
                                        <input className="contact__survey-input"></input>
                                    </div>
                                    <div >
                                        <label className="contact__survey-input-Title">Email</label>
                                        <input className="contact__survey-input"></input>
                                    </div>
                                </div>

                                <div className="survey-form-body">
                                    <label className="contact__survey-input-Title">Subject</label>
                                    <input className="contact__survey-input"></input>
                                </div>
                                <div className="survey-form-body">
                                    <label className="contact__survey-input-Title">Description</label>
                                    <textarea className="contact__survey-textarea"></textarea>
                                </div>

                                <button className="contact__survey-btn">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default Contact