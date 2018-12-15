export const TASKS_FILTER = {
  all: 'ALL',
  noWorker: 'NO_WORKER',
  userCreator: 'USER_CREATOR',
  userWorker: 'USER_WORKER',
};

export const SORT_DIRECTION = {
  up: 'UP',
  down: 'DOWN',
};

export const TASKS_SORT = {
  create: { value: 'created_at', label: 'Дата создания' },
  deadline: { value: 'deadline', label: 'Дедлайн' },
};

export const COOKIE_LIFETIME = 600;

export const TASKS_DEFAULT_START_PAGE = 1;
export const TASKS_DEFAULT_ITEMS_PER_PAGE = 5;

export const COMMENTS_DEFAULT_START_PAGE = 1;
export const COMMENTS_DEFAULT_ITEMS_PER_PAGE = 5;

export const API_URL = 'back-exchange.herokuapp.com'
export const NOCORS_URL = 'https://cors-anywhere.herokuapp.com/';
