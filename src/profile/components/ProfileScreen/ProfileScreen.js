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
import TEPagination from "../../../global/components/TEPagination/TEPagination";


class ProfileScreen extends Component {

  constructor(props) {
    super(props);

    this.defaultPage = 1;
    this.defaultTaskPerPage = 5;

    this.state = {
      activePage: this.defaultPage,
    };
  }

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber });
    this.props.fetchProfileTasks(this.props.signIn.token, this.props.signIn.id, pageNumber, this.defaultTaskPerPage);
  };

  componentDidMount() {
    this.props.fetchProfile(this.props.signIn.token);
    this.props.fetchProfileTasks(this.props.signIn.token, this.props.signIn.id, this.state.activePage, this.defaultTaskPerPage);
  }

  render() {

    const { token } = this.props.signIn;

    const profile = this.props.profile;

    const tasks = this.props.profileTasks.profileTasks;

    const totalTasks = this.props.profileTasks.totalTasks;

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
              <div className="tasks-screen__pagination">
                <div className="tasks-screen__pagination_pages">
                  {this.props.profileTasks.fetching ?
                    null
                    :
                    <TEPagination
                      activePage={this.state.activePage}
                      totalItemsCount={totalTasks}
                      itemsCountPerPage={this.defaultTaskPerPage}
                      pageRangeDisplayed={3}
                      onChange={this.handlePageChange}
                    />}
                </div>
                <div className="tasks-screen__pagination_totals">
                  {totalTasks ? 'Показана страница: ' + this.state.activePage + ' из ' + Math.ceil(totalTasks / this.defaultTaskPerPage) : null}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Layout>
    );
  }
}

export default ProfileScreen;