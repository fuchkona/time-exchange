import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
} from "reactstrap";
import Pagination from "react-js-pagination";

import Layout from '../../containers/Layout/Layout';
import BriefTask from '../BriefTask/BriefTask';
import { TASKS_FILTER } from '../../../constants';
import './TasksScreen.scss';

class TasksScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      filter: TASKS_FILTER.all,
    };
  }

  applyFilter = (tasks, filter) => {
    switch (filter) {
      case TASKS_FILTER.noWorker:
        return tasks.filter((task) => !!task.worker);

      case TASKS_FILTER.userCreator:
        return tasks.filter((task) => task.owner.id === this.props.signIn.id);

      case TASKS_FILTER.userWorker:
        return tasks.filter((task) => !!task.worker && task.worker.id === this.props.signIn.id);
      
      default:
        return tasks;
    }
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  componentDidMount() {
    console.log('did mount');
    this.props.fetchTasks(this.props.signIn.token); // FIXME - если перегружаем, то token в стейт сбрасывается
  }

  render() {
    const { token } = this.props.signIn;
    const { tasks } = this.props.tasks;
    // const { totalTasks } = this.props.tasks;

    const filteredTasks = this.applyFilter(tasks, this.state.filter);
    const totalTasks = filteredTasks.length;

    console.log('component', tasks, totalTasks);

    return (
      <Layout
        debugScreenName="Экран списка задач"
        debugAuthToken={token}
      >
        <div className="tasks-screen">
          <div className="tasks-screen__tasks">
            {filteredTasks.map((task) => <BriefTask key={task.id} {...task} />)}
          </div>
          <div className="tasks-screen__pagination">
            <div className="tasks-screen__pagination_pages">
              <Pagination
                activePage={this.state.activePage}
                totalItemsCount={totalTasks}
                itemsCountPerPage={3}
                pageRangeDisplayed={3}
                onChange={this.handlePageChange}
              />
            </div>
            <div className="tasks-screen__pagination_totals">
              Показано задач: 3 из {totalTasks}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default TasksScreen;