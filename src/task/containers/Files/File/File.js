import React, { Component } from 'react';
import {Button, Card, CardText} from "reactstrap";




class File extends Component {



  render() {

    return(
      <div className="files__one-file justify-content-around">
        <Button color="link">{this.props.filename}</Button>
        <Button color="info"><a className="files__download" download="" href={this.props.url}>Скачать файл</a></Button>
      </div>
    )
  }
}

export default File;


