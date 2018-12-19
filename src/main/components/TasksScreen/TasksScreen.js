import React, { Component } from 'react';

import Layout from '../../containers/Layout/Layout';
import BriefTask from '../BriefTask/BriefTask';
import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';
import {
  TASKS_FILTER,
  TASKS_DEFAULT_START_PAGE,
  TASKS_DEFAULT_ITEMS_PER_PAGE,
  TASKS_SORT,
  SORT_DIRECTION,
} from '../../../constants';
import './TasksScreen.scss';
import TEPagination from "../../../global/components/TEPagination/TEPagination";
import WaitingModal from '../../../global/components/WaitingModal/WaitingModal';

class TasksScreen extends Component {
  state = {
    activePage: TASKS_DEFAULT_START_PAGE,
    filter: TASKS_FILTER.all,
    sort: { item: { label: TASKS_SORT.create.label, value: TASKS_SORT.create.value }, direction: SORT_DIRECTION.down },
  };


  applySort = (tasks) => {
    const { item, direction } = this.state.sort;
    console.log(item, direction);
    return tasks.sort((taskA, taskB) => {
      if (direction === SORT_DIRECTION.down) {
        return taskB[item.value] - taskA[item.value]
      } else if (direction === SORT_DIRECTION.up) {
        return taskA[item.value] - taskB[item.value]
      } else {
        return 0;
      }
    });
  }

  applyFilter = (tasks, filter) => {
    switch (filter) {
      case TASKS_FILTER.noWorker:
        return tasks.filter((task) => !task.worker);

      case TASKS_FILTER.userCreator:
        return tasks.filter((task) => task.owner.id === this.props.signIn.id);

      case TASKS_FILTER.userWorker:
        return tasks.filter((task) => !!task.worker && task.worker.id === this.props.signIn.id);

      default:
        return tasks;
    }
  }

  getItemsOnPage = (tasks) => {
    const startIndex = (this.state.activePage - 1) * TASKS_DEFAULT_ITEMS_PER_PAGE;
    const endIndex = startIndex + TASKS_DEFAULT_ITEMS_PER_PAGE;
    return tasks.slice(startIndex, endIndex);
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  handleFilterChange = (filter) => {
    console.log(filter);
    this.setState({ filter });
  }

  handleTaskDelete = (taskId) => {
    console.log('удаляем', taskId, this.props.signIn.id);
    this.props.deleteTask(this.props.signIn.token, taskId);
  }

  handleSortItemChange = (item) => {
    const currentSort = this.state.sort;
    this.setState({ sort: { item, direction: currentSort.direction } });
  }

  handleSortDirectionChange = (direction) => {
    const currentSort = this.state.sort;
    this.setState({ sort: { direction, item: currentSort.item } });
  }

  componentDidMount() {
    console.log('did mount');
    this.props.fetchTasks(this.props.signIn.token);
  }

  render() {
    const { token } = this.props.signIn;
    const { tasks } = this.props.tasks;
    const FilterComponent = (
        <Filter
            filterItems={[
              { label: 'Все задачи', value: TASKS_FILTER.all },
              { label: 'Без исполнителя', value: TASKS_FILTER.noWorker },
              { label: 'Я - заказчик', value: TASKS_FILTER.userCreator },
              { label: 'Я - исполнитель', value: TASKS_FILTER.userWorker },
            ]}
            activeFilter={this.state.filter}
            onChange={this.handleFilterChange}
        />
    );
    const sortItems = [
      { label: TASKS_SORT.create.label, value: TASKS_SORT.create.value },
      { label: TASKS_SORT.deadline.label, value: TASKS_SORT.deadline.value },
    ];

    const filteredTasks = this.applyFilter(tasks, this.state.filter);
    const totalTasks = filteredTasks.length;
    const sortedTasks = this.applySort(filteredTasks);
    console.log('component', tasks, totalTasks);
    const tasksToDisplay = this.getItemsOnPage(sortedTasks);
    const tasksCountOnPage = tasksToDisplay ? tasksToDisplay.length : 0;

    return (
        <Layout
            debugScreenName="Экран списка задач"
            debugAuthToken={token}
            filter={FilterComponent}
        >
          <div className="tasks-screen">
            <div className="tasks-screen_sort">
              <Sort
                  sortItems={sortItems}
                  activeSort={this.state.sort}
                  onSortItemChange={this.handleSortItemChange}
                  onSortDirectionChange={this.handleSortDirectionChange}
              />
            </div>
            <div className="tasks-screen__tasks">
              {tasksToDisplay.map((task) => (
                  <BriefTask
                      key={task.id}
                      {...task} // TOFIX onDelete - а что если уже есть Requests на этот таск? как проверить и не удалять?
                      onDelete={(task.owner.id === this.props.signIn.id && !task.worker) ? this.handleTaskDelete : null}
                  />
              ))}
            </div>
            <WaitingModal
                open={this.props.tasks ? this.props.tasks.fetching : false}
            />
            <div className="tasks-screen__pagination">
              <div className="tasks-screen__pagination_pages">
                <TEPagination
                    activePage={this.state.activePage}
                    totalItemsCount={totalTasks}
                    itemsCountPerPage={TASKS_DEFAULT_ITEMS_PER_PAGE}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                />
              </div>
              <div className="tasks-screen__pagination_totals">
                Показано задач: {tasksCountOnPage} из {totalTasks}
              </div>
            </div>
          </div>
        </Layout>
    );
  }
}

export default TasksScreen;