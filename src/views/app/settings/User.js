/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Collapse,
  ButtonDropdown,
  CustomInput,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';

import {
  getTodoList,
  getTodoListWithOrder,
  getTodoListSearch,
  selectedTodoItemsChange,
} from 'redux/actions';
import TodoListItem from 'components/applications/TodoListItem';
import AddNewTodoModal from 'containers/applications/AddNewTodoModal';
import TodoApplicationMenu from 'containers/applications/TodoApplicationMenu';
import { deleteAllUsers, getAllUsers } from 'api';


const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const TodoApp = ({
  match,
  intl,
  searchKeyword,
  loading,
  orderColumn,
  orderColumns,
  selectedItems,
  getTodoListAction,
  getTodoListWithOrderAction,
  getTodoListSearchAction,
  selectedTodoItemsChangeAction,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);

  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await getAllUsers();
    if (res?.data) {
      setUsers(res.data);
      console.log(res.data);
    }
   };

   useEffect(() => {
    loadUsers()
 }, []);

 const deleteUsers = async()=>{

  const res = await deleteAllUsers(users.id);
console.log(res);
 }

  useEffect(() => {
    document.body.classList.add('right-menu');
    getTodoListAction();

    return () => {
      document.body.classList.remove('right-menu');
    };
  }, [getTodoListAction]);

  const handleCheckChange = (event, id) => {
    if (lastChecked == null) {
      setLastChecked(id);
    }

    let selectedList = Object.assign([], selectedItems);
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((x) => x !== id);
    } else {
      selectedList.push(id);
    }
    selectedTodoItemsChangeAction(selectedList);

    if (event.shiftKey) {
      let items = users;
      const start = getIndex(id, items, 'id');
      const end = getIndex(lastChecked, items, 'id');
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedList.push(
        ...items.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedList));
      selectedTodoItemsChangeAction(selectedList);
    }
  };

  const handleChangeSelectAll = () => {
    if (loading) {
      if (selectedItems.length >= users.length) {
        selectedTodoItemsChangeAction([]);
      } else {
        selectedTodoItemsChangeAction(users.map((x) => x.id));
      }
    }
  };

  const { messages } = intl;

  return (
    <>
      <Row className="app-row survey-app">
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.todo" />
            </h1>
            <Breadcrumb  match={match} />
            {loading && (
              <div className="text-zero top-right-button-container">
                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button"
                  onClick={() => setModalOpen(true)}
                >
                  <IntlMessages id="todo.add-new" />
                </Button>{' '}
                <ButtonDropdown
                  isOpen={dropdownSplitOpen}
                  toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
                >
                  <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
                    <CustomInput
                      className="custom-checkbox mb-0 d-inline-block"
                      type="checkbox"
                      id="checkAll"
                      checked={selectedItems.length >= users.length}
                      onClick={() => handleChangeSelectAll()}
                      onChange={() => handleChangeSelectAll()}
                      label={
                        <span
                          className={`custom-control-label ${
                            selectedItems.length > 0 &&
                            selectedItems.length < users.length
                              ? 'indeterminate'
                              : ''
                          }`}
                        />
                      }
                    />
                  </div>
                  <DropdownToggle
                    caret
                    color="primary"
                    className="dropdown-toggle-split btn-lg"
                  />
                  <DropdownMenu right>
                    <DropdownItem onClick={()=>{deleteUsers(users.id)}}>
                      <IntlMessages id="todo.action" />
                    </DropdownItem>
                    <DropdownItem>
                      <IntlMessages id="todo.another-action" />
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
            )}
            {/* <Breadcrumb match={match} /> */}
           
          </div>

          <div className="mb-2">
            <Button
              color="empty"
              className="pt-0 pl-0 d-inline-block d-md-none"
              onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
            >
              <IntlMessages id="todo.display-options" />{' '}
              <i className="simple-icon-arrow-down align-middle" />
            </Button>
            <Collapse
              id="displayOptions"
              className="d-md-block"
              isOpen={displayOptionsIsOpen}
            >
              <div className="d-block mb-2 d-md-inline-block">
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                  <DropdownToggle caret color="outline-dark" size="xs">
                    <IntlMessages id="todo.orderby" />
                    {orderColumn ? orderColumn.label : ''}
                  </DropdownToggle>
                  <DropdownMenu>
                    {orderColumns.map((o, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => getTodoListWithOrderAction(o.column)}
                        >
                          {o.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
                    placeholder={messages['menu.search']}
                    defaultValue={searchKeyword}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        getTodoListSearchAction(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
            </Collapse>
          </div>
          <Separator className="mb-5" />
          <Row>
            {loading ? (
              users.map((item, index) => (
                <TodoListItem
                  key={`todo_item_${index}`}
                  item={item}
                  handleCheckChange={handleCheckChange}
                  isSelected={loading ? selectedItems.includes(item.id) : false}
                />
              ))
            ) : (
              <div className="loading" />
            )}
          </Row>
        </Colxx>
      </Row>
      {loading && <TodoApplicationMenu />}
      <AddNewTodoModal
        toggleModal={() => setModalOpen(!modalOpen)}
        modalOpen={modalOpen}
      />
    </>
  );
};

const mapStateToProps = ({ todoApp }) => {
  const {
    
    searchKeyword,
    loading,
    orderColumn,
    orderColumns,
    selectedItems,
  } = todoApp;
  return {
    
    searchKeyword,
    loading,
    orderColumn,
    orderColumns,
    selectedItems,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getTodoListAction: getTodoList,
    getTodoListWithOrderAction: getTodoListWithOrder,
    getTodoListSearchAction: getTodoListSearch,
    selectedTodoItemsChangeAction: selectedTodoItemsChange,
  })(TodoApp)
);
