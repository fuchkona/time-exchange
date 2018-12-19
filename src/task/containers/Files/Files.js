import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

import './Files.scss';
import {bindActionCreators} from "redux";
import {createFile, deleteFile, fetchFiles} from "../../redux/Files/actions";
import connect from "react-redux/es/connect/connect";
import File from "./File/File";
import LoadingAnimation from "../../../global/components/LoadingAnimation/LoadingAnimation";
import LoadingAnimationMini from "../../../global/components/LoadingAnimationMini/LoadingAnimationMini";


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

  handleFileDelete = (fileId) => {
    this.props.deleteFile(this.props.token, fileId);
  };

  componentDidMount() {
    const { token, taskId } = this.props;
    this.props.fetchFiles(token, taskId);
  }


  render() {
    const files = this.props.files.files;

    const { userId } = this.props;

    return (
      <div className="files">
        <div className="files__list">
          {this.props.files.fetching ?
            <LoadingAnimation/> :
            !files ? null :

            files.map((file) => (
              <File key={file.id}
                    onDelete={this.handleFileDelete}
                    userId={userId}
                    {...file}/>
            ))}
        </div>
        <div className="files__drop-zone">
          <Dropzone
            accept=""
            onDrop={this.onDrop}
          >
            {this.props.files.addingFile || this.props.files.deletingFile ? <LoadingAnimationMini/>
              : <p>Переместите свои файлы сюда для загрузки на сервер</p>}

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
      fetchFiles, createFile, deleteFile
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Files);