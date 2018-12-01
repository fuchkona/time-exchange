import React, {Component} from 'react';
import './TEPagination.scss';
import Pagination from "react-js-pagination";

class TEPagination extends Component {

  render() {
    return (
      <Pagination
        activePage={this.props.activePage}
        totalItemsCount={this.props.totalItemsCount}
        itemsCountPerPage={this.props.itemsCountPerPage}
        pageRangeDisplayed={this.props.pageRangeDisplayed}
        onChange={this.props.onChange}
        />
    );
  }
}

export default TEPagination;