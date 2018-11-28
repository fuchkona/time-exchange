import React, {Component} from 'react';

import {
  CardBody,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem, FormGroup, Button
} from "reactstrap";
import convertDate from "../../../utils/convertDate";



class ProfileInfo extends Component {


  render() {

    const profile = this.props.profile;
    console.log('Profile', profile);

    return (
      <Card className="brief-task m-2">
        <CardHeader className="profile-screen__header">
          <div>Пользователь: {profile.username}</div>
        </CardHeader>
        <CardBody className="profile-screen__body">
          <ListGroup>
            <ListGroupItem>Email: {profile.email}</ListGroupItem>
            <ListGroupItem>Имя: {profile.full_name}</ListGroupItem>
            <ListGroupItem>Баланс: {profile.time}</ListGroupItem>
            <ListGroupItem>Зарегистрирован: {convertDate(profile.created_at)}</ListGroupItem>
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