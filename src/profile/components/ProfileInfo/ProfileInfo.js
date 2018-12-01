import React, { Component } from 'react';

import {
  CardBody,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Button
} from "reactstrap";
import moment from 'moment';



class ProfileInfo extends Component {


  render() {

    const profile = this.props.profile;
    console.log('Profile', profile);

    return (
      <Card>
        <CardHeader className="profile-screen__header">
          <div>Пользователь: {profile.username}</div>
        </CardHeader>
        <CardBody className="profile-screen__body">
          <ListGroup>
            <ListGroupItem>Email: {profile.email}</ListGroupItem>
            <ListGroupItem>Имя: {profile.full_name}</ListGroupItem>
            <ListGroupItem>Баланс: {profile.time}</ListGroupItem>
            <ListGroupItem>Зарегистрирован: {moment(profile.created_at * 1000).format('Do MMMM YYYY')}</ListGroupItem>
          </ListGroup>
          <FormGroup>
            <Button className="profile-screen__button_update">Редактировать</Button>
          </FormGroup>
        </CardBody>
      </Card>
    );
  }

}


export default ProfileInfo;