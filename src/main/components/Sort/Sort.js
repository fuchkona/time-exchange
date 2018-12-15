import React, { Component } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { TASKS_SORT, SORT_DIRECTION } from '../../../constants';
import './Sort.scss';

class Sort extends Component {
  state = {
    dropdownItemOpen: false,
    dropdownDirectionOpen: false,
  };

  handleSortItemChange = (item) => {
    this.setState({ dropdownItemOpen: false });
    if (item.value !== this.props.activeSort.item.value && this.props.onSortItemChange) {
      this.props.onSortItemChange(item);
    }
  }

  handleSortDirectionChange = (direction) => {
    this.setState({ dropdownDirectionOpen: false });
    if (direction !== this.props.activeSort.direction && this.props.onSortDirectionChange) {
      this.props.onSortDirectionChange(direction);
    }
  }

  toggleItem = () => {
    this.setState({ dropdownItemOpen: !this.state.dropdownItemOpen});
  }

  toggleDirection = () => {
    this.setState({ dropdownDirectionOpen: !this.state.dropdownDirectionOpen});
  }

  render() {
    const { sortItems, activeSort } = this.props;

    return (
      <div className="sort">
        <Dropdown className="sort__item" isOpen={this.state.dropdownItemOpen} toggle={this.toggleItem}>
          <DropdownToggle caret>
            {activeSort.item.label}
          </DropdownToggle>
          <DropdownMenu>
          {sortItems.map((item) => (
            <DropdownItem
              onClick={this.handleSortItemChange.bind(this, item)}
            >
            {item.label}
            </DropdownItem>
          ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown className="sort__direction" isOpen={this.state.dropdownDirectionOpen} toggle={this.toggleDirection}>
          <DropdownToggle caret>
            {activeSort.direction}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={this.handleSortDirectionChange.bind(this, SORT_DIRECTION.up)}
            >
            {SORT_DIRECTION.up}
            </DropdownItem>
            <DropdownItem
              onClick={this.handleSortDirectionChange.bind(this, SORT_DIRECTION.down)}
            >
            {SORT_DIRECTION.down}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        
      </div>
    );
  }
}

export default Sort;