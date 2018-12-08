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
import File from "./File/File";
import Comment from "../Comments/Comment/Comment";
import LoadingAnimation from "../../../global/components/LoadingAnimation/LoadingAnimation";

class Files extends Component {


  onDrop = (file) => {
    console.log(file);
    const { token, taskId, userId } = this.props;

    for (let key in file){
      if (file.hasOwnProperty(key)){
        const fileDetails = {
          file: file[key],
          taskId: taskId,
          userId: userId
        };

        this.props.createFile(token, fileDetails);
      }
    }

  };

  componentDidMount() {
    console.log('div mount files', this.props);
    const { token, taskId } = this.props;
    this.props.fetchFiles(token, taskId);

  }


  render() {

    const files = this.props.files.files;

    console.log(files);
    console.log('fet', this.props.files.fetching);

    return (
      <div className="files">
        <div className="files__list">
          {this.props.files.fetching ?
            <LoadingAnimation/> :
            !files ? null :

            files.map((file) => (
              <File key={file.id}
                    {...file}/>
            ))}
        </div>
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