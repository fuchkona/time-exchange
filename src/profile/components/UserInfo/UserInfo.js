import React, { Component} from "react";
import Card from "reactstrap/src/Card";
import CardHeader from "reactstrap/src/CardHeader";
import CardBody from "reactstrap/src/CardBody";
import ListGroup from "reactstrap/src/ListGroup";
import ListGroupItem from "reactstrap/src/ListGroupItem";
import moment from "moment";


class UserInfo extends Component{

  render() {

    const user = this.props.user;

    return (
      <Card className="m-2 user-screen__card">
        <CardHeader className="user-screen__header">
          <div>Пользователь: {user.username}</div>
        </CardHeader>
        <CardBody className="user-screen__body">
          <ListGroup>
            <ListGroupItem>Email: {user.email}</ListGroupItem>
            <ListGroupItem>Имя: {user.full_name}</ListGroupItem>
            <ListGroupItem>Зарегистрирован: {moment(user.created_at * 1000).format('Do MMMM YYYY')}</ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    )
  }
}

export default UserInfo;