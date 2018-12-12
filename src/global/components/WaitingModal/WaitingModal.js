import React, { Component } from 'react';
import {
  Modal,
  ModalBody,
} from 'reactstrap';

import './WaitingModal.scss';
import LoadingAnimationMini from '../LoadingAnimationMini/LoadingAnimationMini';

export default class WaitingModal extends Component {
  render() {
    const className = 'waiting-modal';

    return (
        <Modal autoFocus={false} centered isOpen={this.props.open} className={className}>
          <ModalBody className="waiting-modal__body">
            <div>Обмен данных с сервером...</div>
            <LoadingAnimationMini />
          </ModalBody>
        </Modal>
    );
  }
}
