import React, { Component } from 'react';
import { Button, FormGroup } from "reactstrap";


class File extends Component {

  render() {

    return(
      <div className="files__one-file">
          <Button color="link">{this.props.filename}</Button>
        <FormGroup>
          <Button className="files__button " color="info"><a className="files__download" download="" href={this.props.url}>Скачать</a></Button>
          <Button className="files__button files__button_orange" color="warning">Удалить</Button>
        </FormGroup>
      </div>
    )
  }
}

export default File;


