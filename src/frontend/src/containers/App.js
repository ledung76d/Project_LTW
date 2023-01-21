import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated, adminIsNotAuthenticated, adminIsAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from '../components/Auth/Login';

import Header from './Header/Header';
import System from '../routes/System';

import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';
import NavigatorBar from '../components/NAV/NavigatorBar';
import Faq from '../components/NAV/Faq';
import Contact from '../components/NAV/Contact/Contact';

import PlaceOrder from '../components/PlaceOrder/Placeorder';
import CheckoutOrder from '../components/Checkout/CheckoutOrder'
import MyOders from '../components/MyOders/MyOders';
import Profile from '../components/UserLogin/Profile/Profile';
import ChangePassword from '../components/UserLogin/ChangePassword/ChangePassword';
import LoginAdmin from '../components/Admin/AuthAdmin/LoginAdmin';
import Admin from '../components/Admin/Admin';
import AdminNav from '../components/Admin/AdminNav';
import ScrollToTop from './ScrollToTop'
import Register from '../components/Auth/Register';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <ConfirmModal />
                        {/* {this.props.isLoggedIn && <Header />} */}
                        <ScrollToTop />
                        {this.props.mode === 'userMode' ? <NavigatorBar /> : (this.props.isAdminLoggedIn === true ? <AdminNav /> : <></>)}
                        <div className="content-container">
                            <Switch>
                                <Route path={path.HOME} exact component={(Home)} />
                                <Route path={path.FAQ} exact component={(Faq)} />
                                <Route path={path.CONTACT} exact component={(Contact)} />
                                <Route path='/health'>
                                    <h3>
                                        Ok
                                    </h3>
                                </Route>
                                <Route path='/checkout'>
                                    <CheckoutOrder />
                                </Route>
                                <Route path='/register' component={Register} />
                                <Route path="/placeorder/:id" component={userIsAuthenticated(PlaceOrder)} />
                                <Route path='/my-order' component={userIsAuthenticated(MyOders)} />
                                <Route path='/profile' component={userIsAuthenticated(Profile)} />
                                <Route path='/change-password' component={userIsAuthenticated(ChangePassword)} />
                                <Route path='/admin/login' component={adminIsNotAuthenticated(LoginAdmin)} />
                                <Route path='/admin' component={adminIsAuthenticated(Admin)} />
                                <Redirect to={path.HOME} />
                            </Switch>
                        </div>
                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
                        <ToastContainer
                            position="top-center"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment>

        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        mode: state.app.mode,
        isLoggedIn: state.user.isLoggedIn,
        isAdminLoggedIn: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);