import React, { Component } from 'react';
import { Button, FormGroup } from "reactstrap";


class File extends Component {

  handleFileDelete = () => {
    this.props.onDelete(this.props.id);
  };

  render() {

    console.log('FILE',this.props);

    return(
      <div className="files__one-file">
          <Button color="link">{this.props.filename}</Button>
        <FormGroup>
          <Button className="files__button " color="info">
            <a className="files__download" download="" href={this.props.url}>Скачать</a>
          </Button>
          { this.props.user_id == this.props.userId ?
          <Button onClick={this.handleFileDelete}
                  className="files__button files__button_orange"
                  color="warning">Удалить</Button> :
            null}
        </FormGroup>
      </div>
    )
  }
}

export default File;


