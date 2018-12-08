import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import {
  Card,
  CardText,
  CardBody,
  CardHeader,
  CardFooter, Row,
} from "reactstrap";

import './Files.scss';
import {bindActionCreators} from "redux";
import {createFile, fetchFiles} from "../../redux/Files/actions";
import connect from "react-redux/es/connect/connect";

class Files extends Component {


  onDrop = (file) => {
    console.log(file);
    const { token, taskId } = this.props;
    const fileDetails = {
      file: file[0],
      taskId: taskId,

    };

    this.props.createFile(token, fileDetails);
  };

  componentDidMount() {
    console.log('div mount files', this.props);
    const { token, taskId } = this.props;
    this.props.fetchFiles(token, taskId);

  }


  render() {

    const files = this.props;

    return (
      <div className="files">
        <div className="files__list">список</div>
        <div className="files__drop-zone">
          <Dropzone
            accept=""
            onDrop={this.onDrop}
          >
            <p>Переместите свои файлы сюда</p>
          </Dropzone>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.files,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchFiles, createFile,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Files);