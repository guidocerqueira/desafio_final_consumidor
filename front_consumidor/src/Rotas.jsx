import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import useAuth from './hooks/useAuth';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard'

function RotasProtegidas(props) {
  const { token } = useAuth();

  return (
    <Route
      render={() => (token ? props.children : <Redirect to="/" />)}
    />
  );
}

function Rotas() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/cadastro" exact component={Cadastro} />
            
            <Route path="/restaurantes" exact component={Dashboard} />
            <RotasProtegidas>
            </RotasProtegidas>
          </Switch>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default Rotas;
