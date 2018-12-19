import React, { Component } from 'react';
import './ProfileInfo.scss';

import {
  CardBody,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Button,
  Label,
  Input, CardFooter
} from "reactstrap";
import moment from 'moment';



class ProfileInfo extends Component {

  constructor(props){
    super(props);

    this.profile = this.props.profile;

    this.state = {
      profileUserName: this.profile.username,
      profileFullName: this.profile.full_name,
      profileEmail: this.profile.email,
      currentPassword: '',
      newPassword: '',
      newPasswordRepeat: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]:  event.target.value
    });
  };

  handleUpdateProfile = () => {

    let profileDetails = {
      username: this.state.profileUserName,
      full_name: this.state.profileFullName,
      email: this.state.profileEmail
    };

    this.props.onProfileUpdate(profileDetails);
  };

  handleChangePassword = () => {

    let passwordDetails = {
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword,
      newPasswordRepeat: this.state.newPasswordRepeat
    };

    this.props.onChangePassword(passwordDetails)
  };

  render() {

    return (
      <Card className="m-2 profile-screen__card">
        <CardHeader className="profile-screen__header">
          <div>Пользователь: {this.profile.username}</div>
        </CardHeader>
        <CardBody className="profile-screen__body">
          <ListGroup>
            <ListGroupItem>
              Баланс: {this.profile.time}
            </ListGroupItem>
            <ListGroupItem>
              Зарегистрирован: {moment(this.profile.created_at * 1000).format('Do MMMM YYYY')}
            </ListGroupItem>
            <ListGroupItem>
              <Label for="profileUserName">Имя пользователя:</Label>
              <Input type="text" name="profileUserName" id="profileUserName"
                     value={this.state.profileUserName} onChange={this.handleChange} />
            </ListGroupItem>
            <ListGroupItem>
              <Label for="profileEmail">Email:</Label>
              <Input type="email" name="profileEmail" id="profileEmail"
                     value={this.state.profileEmail} onChange={this.handleChange} />
            </ListGroupItem>
            <ListGroupItem>
              <Label for="profileFullName">Имя:</Label>
              <Input type="text" name="profileFullName" id="profileFullName"
                     value={this.state.profileFullName} onChange={this.handleChange} />
            </ListGroupItem>
          </ListGroup>
          <FormGroup className="m-2">
            <Button className="profile-screen__button_update" onClick={this.handleUpdateProfile}>Редактировать</Button>
          </FormGroup>
        </CardBody>
        <CardFooter>
          <ListGroup>
            <ListGroupItem>
              <Label for="oldPassword">Старый пароль:</Label>
              <Input type="password" name="currentPassword" id="oldPassword"
                     value={this.state.currentPassword} onChange={this.handleChange} />
            </ListGroupItem>
            <ListGroupItem>
              <Label for="newPassword">Новый пароль:</Label>
              <Input type="password" name="newPassword" id="newPassword"
                     value={this.state.newPassword} onChange={this.handleChange} />
            </ListGroupItem>
            <ListGroupItem>
              <Label for="newPasswordRepeat">Повторите пароль:</Label>
              <Input type="password" name="newPasswordRepeat" id="newPasswordRepeat"
                     value={this.state.newPasswordRepeat} onChange={this.handleChange} />
            </ListGroupItem>
          </ListGroup>
          <FormGroup className="m-2">
            <Button className="profile-screen__button_update_password"
                    onClick={this.handleChangePassword}>Изменить пароль</Button>
          </FormGroup>
        </CardFooter>
      </Card>
    );
  }

}


export default ProfileInfo;