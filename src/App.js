import React from 'react';
import './App.css';
import Navbar, { BigMenu } from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, HashRouter, Navigate } from "react-router-dom";
import DialogsContainer from './components/Dialogs/DialogsContainer';
//import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderComponent from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginConteiner';
import { connect } from 'react-redux';
import { initializeAppTC } from './redux/app-reducer'
import { AuthTC } from './redux/auth-reducer'
import Preloader from './components/common/Preloader/Preloader';
import { Provider } from 'react-redux';
import store from './redux/redux-store';
import Friends from './components/Friends/Friends';
import CookieInfo from './components/CookieInfo/CookieInfo';
import { MessagesItem } from './components/Dialogs/Dialogs';
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));


class App extends React.Component {
  componentDidMount() {
    this.props.initializeAppTC();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    else {
      return (
        <HashRouter>
          <div className='app-wrapper'>
            <HeaderComponent />
            <Navbar />
            <div className='app-wrapper-content'>
              <React.Suspense fallback={<div>...Loading</div>}>
                <Routes>
                  <Route path='/' element={<Navigate to="/profile" replace />} />
                  <Route path='/profile' element={<ProfileContainer />}>
                    <Route path=':userId' element={<ProfileContainer />} />
                  </Route>
                  <Route path='/dialogs' element={<DialogsContainer />}>
                  </Route>
                  <Route path ='/messages' element={<MessagesItem />}>
                    <Route path=':idDialog' element={<DialogsContainer />} />
                  </Route>
                  <Route path='/users/*' element={<UsersContainer />} />
                  <Route path='/login/*' element={<LoginContainer />} />
                  <Route path='/friends' element={<Friends />} />
                  <Route path='/menu' element={<BigMenu />} />
                  <Route
                    path="*"
                    element={<Navigate to="/profile" replace />}
                  />
                </Routes>
              </React.Suspense>
            </div>
            <CookieInfo />
          </div>
        </HashRouter>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

const AppContainer = connect(mapStateToProps, {
  initializeAppTC, AuthTC
})(App);

export default function MainApp(props) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </React.StrictMode>
  );
}