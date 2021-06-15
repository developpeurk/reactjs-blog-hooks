import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import AuthContext from './AuthContext/index';

function Header() {
  const { authUser, firebaseAuth } = React.useContext( AuthContext );
  
  const logout = async() =>
  {
    await firebaseAuth.signOut();
  }
  return (
    <div className="Header">
      <img
        src="https://cdn.pixabay.com/photo/2016/12/28/08/15/hummingbird-1935665__340.png"
        alt=""
        className="logo"
      />
      <div className="main-nav">
        <NavLink to="/" className="link">
          Home
        </NavLink>
        <NavLink to="/search" className="link">
          Search
        </NavLink>
        { authUser ? (
             <>
                <div className="link">
                      {authUser.displayName}
                 </div>
                <div className="link logout" onClick={() => logout()}>
                     Logout
                </div>
            </>
            ) : (
          <>
                  <NavLink to="/login" className="link">
                  Login
            </NavLink>
            <NavLink to="/register" className="link">
            Register
              </NavLink>
              </>
            
      )
      }

        
      </div>
    </div>
  );
}
export default withRouter(Header);
