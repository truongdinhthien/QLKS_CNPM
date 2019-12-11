import React, { Component } from 'react';
import {Route, Switch,BrowserRouter as Router} from 'react-router-dom';
import AppAdmin from './AppAdmin';
import AppEmployer from './AppEmployer';
import AppLogin from './AppLogin';
import NotFoundPage from './Pages/NotFoundPage';


class Start extends Component {
    render() {
        return (
            <>
            <Router>
                <Switch>
                    <Route path = '/' exact component = {AppLogin}></Route>
                    <Route path = '/employer-mode' component = {AppEmployer}></Route>
                    <Route path = '/admin-mode' component = {AppAdmin}></Route>
                    <Route component = {NotFoundPage}></Route> 
                </Switch>
            </Router>
            </>
           
        );
    }
}

export default Start;