import React, { Component } from 'react';
import {
  Row,
  Col, CardHeader, CardBody, Card,
} from "reactstrap";

import Layout from '../../../main/containers/Layout/Layout';
import './ProfileScreen.scss';
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import LoadingAnimation from "../../../global/components/LoadingAnimation/LoadingAnimation";
import BriefTask from "../../../main/components/BriefTask/BriefTask";
import TEPagination from "../../../global/components/TEPagination/TEPagination";
import {fetchProfileChangePass, fetchProfileUpdate} from "../../actions";
import {toast} from "react-toastify";
import WaitingModal from "../../../global/components/WaitingModal/WaitingModal";


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

  handleProfileUpdate = (profileDetails) => {
    this.props.fetchProfileUpdate(this.props.signIn.token, profileDetails)
  };

  handleChangePassword = (passwordDetails) => {
    this.props.fetchProfileChangePass(this.props.signIn.token, passwordDetails);
  };


  componentDidMount() {
    this.props.fetchProfile(this.props.signIn.token);
    this.handlePageChange(this.defaultPage);
  }

  checkErrors(){
    let result = this.props.profile.result;
    if (!result){
      return;
    }

    if (!result.success){
      for (let key in result.data){
        toast.error(result.data[key].message);
      }
    }
    else {
      toast.info('Данные успешно изменены');
    }
  }

  render() {

    const { token } = this.props.signIn;

    const profile = this.props.profile;

    const tasks = this.props.profileTasks.profileTasks;

    const totalTasks = this.props.profileTasks.totalTasks;

    this.checkErrors();

    return (
      <Layout
        debugScreenName="Экран профиля пользователя"
        debugAuthToken={token}
      >

        <div className="profile-screen">
          <WaitingModal
            open={this.props.profile.updateProfile || this.props.profile.changePass}
          />
          <Row>
          <Col md="4">
            {this.props.profile.fetching ?
              <LoadingAnimation/> :
              <ProfileInfo onProfileUpdate={this.handleProfileUpdate}
                           onChangePassword={this.handleChangePassword}
                           {...profile}/>}
          </Col>
            <Col md="8">
              <Card className="profile-screen__portfolio m-2">
                <CardHeader>Выполненные задачи</CardHeader>
                <CardBody>
                {this.props.profileTasks.fetching ? <LoadingAnimation/> : tasks.map((task) => <BriefTask key={task.id} {...task} />)}
                </CardBody>
              </Card>
              <div className="profile-screen__pagination">
                <div className="profile-screen__pagination_pages">
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
                <div className="profile-screen__pagination_totals">

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