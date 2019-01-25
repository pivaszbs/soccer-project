import React from 'react';
import Layout from './hoc/Layout';
import { Switch } from 'react-router-dom';

import Home from './components/home';
import SignIn from './components/signin';
import Dashboard from './components/admin/Dashboard';
import PrivateRoute from './components/authRoutes/PrivateRoute';
import PublicRoute from './components/authRoutes/PublicRoute';
import AdminMatches from './components/admin/matches';
import AddEditMactch from './components/admin/matches/AddEditMatch';


const Routes = (props) => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute {...props} path="/admin_matches/edit_match/:id" exact component={AddEditMactch}/>  
        <PrivateRoute {...props} path="/admin_matches" exact component={AdminMatches}/>  
        <PrivateRoute {...props} path="/dashboard" exact component={Dashboard}/>  
        <PublicRoute {...props} exact component={SignIn} restricted={true} path="/sign_in"/>
       <PublicRoute {...props} path="/" restricted={false} exact component={Home}/>
      </Switch>
    </Layout>
  );
};

export default Routes;