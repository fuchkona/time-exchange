import React, { Component} from "react";
import UserInfo from "../UserInfo/UserInfo";
import Layout from "../../../main/containers/Layout/Layout";
import Row from "reactstrap/src/Row";
import Col from "reactstrap/src/Col";
import LoadingAnimation from "../../../global/components/LoadingAnimation/LoadingAnimation";
import Card from "reactstrap/src/Card";
import CardHeader from "reactstrap/src/CardHeader";
import CardBody from "reactstrap/src/CardBody";
import BriefTask from "../../../main/components/BriefTask/BriefTask";
import TEPagination from "../../../global/components/TEPagination/TEPagination";
import "./UserScreen.scss";


class UserScreen extends Component{


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
    this.props.fetchUser(this.props.signIn.token, this.props.signIn.id);
    this.props.fetchProfileTasks(this.props.signIn.token, this.props.signIn.id, this.state.activePage, this.defaultTaskPerPage);
  }

  render() {

    const { token } = this.props.signIn;

    const user = this.props.user;

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
              {this.props.user.fetching ? <LoadingAnimation/> : <UserInfo {...user}/>}
            </Col>
            <Col md="8">
              <Card className="user-screen__portfolio m-2">
                <CardHeader>Выполненные задачи</CardHeader>
                <CardBody>
                  {this.props.profileTasks.fetching ? <LoadingAnimation/> : tasks.map((task) => <BriefTask key={task.id} {...task} />)}
                </CardBody>
              </Card>
              <div className="user-screen__pagination">
                <div className="user-screen__pagination_pages">
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
                <div className="user-screen__pagination_totals">

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

export default UserScreen;