import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

import './Files.scss';
import {bindActionCreators} from "redux";
import {createFile, fetchFiles} from "../../redux/Files/actions";
import connect from "react-redux/es/connect/connect";
import File from "./File/File";
import LoadingAnimation from "../../../global/components/LoadingAnimation/LoadingAnimation";
import LoadingAnimationMini from "../../../global/components/LoadingAnimationMini/LoadingAnimationMini";
import {toast, ToastContainer} from "react-toastify";



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
    const { token, taskId } = this.props;
    this.props.fetchFiles(token, taskId);
  }



  checkSuccessFetching = () => {
    if (this.props.files.errors){
      toast.error(this.props.files.errors.message);
    }


    console.log('checkSuccessUploadFile',this.props);
  };


  render() {
    const files = this.props.files.files;
    this.checkSuccessFetching();
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
            {this.props.files.addingFile ? <LoadingAnimationMini/>
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
      fetchFiles, createFile,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Files);