import React, { Component } from 'react';
import {
  Row,
  Col,
} from "reactstrap";

import Layout from '../../../main/containers/Layout/Layout';
import './ProfileScreen.scss';
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import LoadingAnimation from "../../../global/components/LoadingAnimation/LoadingAnimation";
import BriefTask from "../../../main/components/BriefTask/BriefTask";



class ProfileScreen extends Component {


  componentDidMount() {
    this.props.fetchProfile(this.props.signIn.token);
    this.props.fetchProfileTasks(this.props.signIn.token, this.props.signIn.id);
  }

  render() {

    const { token } = this.props.signIn;

    const profile = this.props.profile;

    const tasks = this.props.profileTasks.profileTasks;

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
                {this.props.profileTasks.fetching ? <LoadingAnimation/> : tasks.map((task) => <BriefTask key={task.id} {...task} />)}
              </div>
            </Col>
          </Row>
        </div>
      </Layout>
    );
  }
}

export default ProfileScreen;