import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardTitle,
  CardText,
} from "reactstrap";

import Layout from '../../../main/containers/Layout/Layout';
import './ProfileScreen.scss';

class ProfileScreen extends Component {
  handleSignOut = () => {
    this.props.signOut();
  };

  render() {
    const { token } = this.props.signIn;

    return (
      <Layout
        debugScreenName="Экран профиля пользователя"
        debugAuthToken={token}
      >
        <div className="profile-screen">
          <div>
            <Link to="/">
              <Button
                className="m-2 px-4"
                size="lg"
              >
                Go to TASKS Screen
              </Button>
            </Link>
            <Link to="/profile">
              <Button
                className="m-2 px-4"
                size="lg"
              >
                Go to PROFILE Screen
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
}

export default ProfileScreen;