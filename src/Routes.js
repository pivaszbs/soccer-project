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
import AdminPlayers from './components/admin/players';
import AddEditPlayers from './components/admin/players/AddEditPlayers';


const Routes = (props) => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute {...props} path="/admin_players" exact component={AdminPlayers} />
        <PrivateRoute {...props} path="/admin_players/add_players" exact component={AddEditPlayers} />
        <PrivateRoute {...props} path="/admin_players/add_players/:id" exact component={AddEditPlayers} />
        <PublicRoute {...props} path="/" restricted={false} exact component={Home} />
        <PublicRoute {...props} exact component={SignIn} restricted={true} path="/sign_in" />
        <PrivateRoute {...props} path="/dashboard" exact component={Dashboard} />
        <PrivateRoute {...props} path="/admin_matches" exact component={AdminMatches} />
        <PrivateRoute {...props} path="/admin_matches/edit_match/" exact component={AddEditMactch} />
        <PrivateRoute {...props} path="/admin_matches/edit_match/:id" exact component={AddEditMactch} />
      </Switch>
    </Layout>
  );
};

export default Routes;