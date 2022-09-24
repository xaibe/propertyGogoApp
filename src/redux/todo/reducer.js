import {
  TODO_GET_LIST,
  TODO_GET_LIST_SUCCESS,
  TODO_GET_LIST_ERROR,
  TODO_GET_LIST_WITH_FILTER,
  TODO_GET_LIST_WITH_ORDER,
  TODO_GET_LIST_SEARCH,
  TODO_ADD_ITEM,
  TODO_ADD_ITEM_SUCCESS,
  TODO_ADD_ITEM_ERROR,
  TODO_SELECTED_ITEMS_CHANGE,
} from '../actions';

const INIT_STATE = {
  allTodoItems: null,
  todoItems: null,
  error: '',
  filter: null,
  searchKeyword: '',
  orderColumn: null,
  loading: false,
  agency: [
    { label: 'EDUCATIONIONAL', color: 'secondary' },
    { label: 'NEW FRAMEWORK', color: 'primary' },
    { label: 'PERSONAL', color: 'info' },
  ],
  orderColumns: [
    { column: 'fullname', label: 'Title' },
    { column: 'role', label: 'Role' },
    { column: 'status', label: 'Status' },
    { column: 'agency', label: 'Agency' },
  ],
  roles: ['Super Admin', 'Admin', 'Employee', 'Manager', 'Sales', 'Marketing'],
  selectedItems: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TODO_GET_LIST:
      return { ...state, loading: false };

    case TODO_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        allTodoItems: action.payload,
        todoItems: action.payload,
      };

    case TODO_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case TODO_GET_LIST_WITH_FILTER:
      if (action.payload.column === '' || action.payload.value === '') {
        return {
          ...state,
          loading: true,
          todoItems: state.allTodoItems,
          filter: null,
        };
      }
      // eslint-disable-next-line no-case-declarations
      const filteredItems = state.allTodoItems.filter(
        (item) => item[action.payload.column] === action.payload.value
      );
      return {
        ...state,
        loading: true,
        todoItems: filteredItems,
        filter: {
          column: action.payload.column,
          value: action.payload.value,
        },
      };

    case TODO_GET_LIST_WITH_ORDER:
      if (action.payload === '') {
        return {
          ...state,
          loading: true,
          todoItems: state.todoItems,
          orderColumn: null,
        };
      }
      // eslint-disable-next-line no-case-declarations
      const sortedItems = state.todoItems.sort((a, b) => {
        if (a[action.payload] < b[action.payload]) return -1;
        if (a[action.payload] > b[action.payload]) return 1;
        return 0;
      });
      return {
        ...state,
        loading: true,
        todoItems: sortedItems,
        orderColumn: state.orderColumns.find(
          (x) => x.column === action.payload
        ),
      };

    case TODO_GET_LIST_SEARCH:
      if (action.payload === '') {
        return { ...state, todoItems: state.allTodoItems };
      }
      // eslint-disable-next-line no-case-declarations
      const keyword = action.payload.toLowerCase();
      // eslint-disable-next-line no-case-declarations
      const searchItems = state.allTodoItems.filter(
        (item) =>
          item.fullname.toLowerCase().indexOf(keyword) > -1 ||
          item.description.toLowerCase().indexOf(keyword) > -1 ||
          item.status.toLowerCase().indexOf(keyword) > -1 ||
          item.role.toLowerCase().indexOf(keyword) > -1 ||
          item.agency.toLowerCase().indexOf(keyword) > -1
      );
      return {
        ...state,
        loading: true,
        todoItems: searchItems,
        searchKeyword: action.payload,
      };

    case TODO_ADD_ITEM:
      return { ...state, loading: false };

    case TODO_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        allTodoItems: action.payload,
        todoItems: action.payload,
      };

    case TODO_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    case TODO_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: true, selectedItems: action.payload };
    default:
      return { ...state };
  }
};
