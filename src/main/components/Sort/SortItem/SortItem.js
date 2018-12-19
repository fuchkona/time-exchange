import React, { Component } from 'react';
import classnames from 'classnames';
import { } from "reactstrap";

import './SortItem.scss';

class SortItem extends Component {
  handleClick = () => {
    if (this.props.onSortChange) {
      this.props.onSortChange(this.props.value);
    }
  }

  render() {
    const itemClassName = classnames(
        'sort-item',
        this.props.active ? 'sort-item_active' : null,
    );

    return (
        <div
            className={itemClassName}
            onClick={this.handleClick}
        >
          {this.props.label}
        </div>
    );
  }
}

export default SortItem;