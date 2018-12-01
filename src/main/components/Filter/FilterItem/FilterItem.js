import React, { Component } from 'react';
import classnames from 'classnames';
import { } from "reactstrap";

import './FilterItem.scss';

class FilterItem extends Component {
  handleClick = () => {
    if (this.props.onItemPick) {
      this.props.onItemPick(this.props.value);
    }
  }

  render() {
    const itemClassName = classnames(
      'filter-item',
      this.props.active ? 'filter-item_active' : null,
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

export default FilterItem;