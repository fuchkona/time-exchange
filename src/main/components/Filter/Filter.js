import React, { Component } from 'react';
import {} from "reactstrap";

import { TASKS_FILTER } from '../../../constants';
import FilterItem from './FilterItem/FilterItem';
import './Filter.scss';

class Filter extends Component {
  handleFilterChange = (value) => {
    if (value !== this.props.activeFilter && this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    const { filterItems, activeFilter } = this.props;

    return (
      <div className="filter">
        {filterItems.map((item) => (
          <FilterItem
            key={item.value}
            active={item.value === activeFilter}
            label={item.label}
            value={item.value}
            onItemPick={this.handleFilterChange}
          />
        ))}
      </div>
    );
  }
}

export default Filter;