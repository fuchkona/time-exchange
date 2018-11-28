import React, { Component } from 'react';
import {
  Row,
  Col,
} from "reactstrap";

import Layout from '../../../main/containers/Layout/Layout';
import './ProfileScreen.scss';
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import LoadingAnimation from "../../../global/components/LoadingAnimation/LoadingAnimation";



class ProfileScreen extends Component {

  handleSignOut = () => {
    this.props.signOut();
  };

  componentDidMount() {
    this.props.fetchProfile(this.props.signIn.token);
  }

  render() {
    const { token } = this.props.signIn;

    let profile = this.props.profile;

    //Типо портфолио, для теста
    // const tasks = [
    //   {
    //   title: 'TEST 1',
    //   contact_time: 666,
    //   worker: profile,
    //   description: 'testDesc 1',
    //   created_at: 123123213,
    //   deadline: 123123213,
    //   id: 1
    // },
    //   {
    //     title: 'TEST 2',
    //     contact_time: 666,
    //     worker: profile,
    //     description: 'testDesc 2',
    //     created_at: 123123213,
    //     deadline: 123123213,
    //     id: 2
    //   }
    // ];



    return (
      <Layout
        debugScreenName="Экран профиля пользователя"
        debugAuthToken={token}
      >

        <div className="profile-screen">
          <Row>
          <Col md="4">
            {this.props.profile.fetching ? <LoadingAnimation/> : <ProfileInfo {...profile}/>}
          </Col>
            <Col md="8">
              <div className="profile-screen__portfolio">
                Список задач
              </div>
            </Col>
          </Row>
        </div>
      </Layout>
    );
  }
}

export default ProfileScreen;