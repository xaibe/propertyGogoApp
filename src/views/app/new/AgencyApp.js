/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';
import {
  Row,
  Button,
  // UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  // Collapse,
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
// import TodoListItem from 'components/applications/TodoListItem';
// import TodoApplicationMenu from 'containers/applications/TodoApplicationMenu';
import AgencyListItem from 'components/applications/AgencyListItem';
import { deleteAllAgenciesApi,  getAllAgenciesApi } from 'api';
import { NotificationManager } from 'components/common/react-notifications';
import AgencyModal from './AgencyModal';
import UpdateAgencyModal from './UpdateAgencyModal';


const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const AgencyApp = ({
  match,
  // intl,
  // searchKeyword,
  loading,
  // orderColumn,
  // orderColumns,
  selectedItems,
  getTodoListAction,
  // getTodoListWithOrderAction,
  // getTodoListSearchAction,
  selectedTodoItemsChangeAction,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [emodalOpen, setEModalOpen] = useState(false);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);
const [update, setUpdate] = useState([]);
  const [agencies, setAgencies] = useState([]);

  const loadAgencies = async () => {
    const res = await getAllAgenciesApi();
    if (res?.data) {
      setAgencies(res.data);
      await loadAgencies();

    }
    else {
      NotificationManager.warning(
        "Unable to Fetch Agency's Data",
        "Error!",
        3000,
        null,
        null,
        ''
      )
    }
   };



   useEffect(() => {
    loadAgencies()
    // eslint-disable-next-line
 }, [agencies]);


 const deleteAgencies = async()=>{
    if(selectedItems.length===1){
       await deleteAllAgenciesApi(selectedItems);
      
    
    }
    else{
      
      await selectedItems.forEach( async (item) => {
        await deleteAllAgenciesApi(item);
      });
    
    }
    await loadAgencies();
  }
 

  useEffect(() => {
    document.body.classList.add('right-menu');
    getTodoListAction();

    return () => {
      document.body.classList.remove('right-menu');
    };
  }, [getTodoListAction]);

  const handleCheckChange = (event, gotItem) => {
    if (lastChecked == null) {
      setLastChecked(gotItem.id);
    }

    let selectedList = Object.assign([], selectedItems);
    if (selectedList.includes(gotItem.id)) {
      selectedList = selectedList.filter((x) => x !== gotItem.id);
    } else {
      selectedList.push(gotItem.id);
    }
    selectedTodoItemsChangeAction(selectedList);
    setUpdate(gotItem)
    console.log("agency update data", update.Address)
    if (event.shiftKey) {
      let items = agencies;
      const start = getIndex(update.id, items, 'id');
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
      if (selectedItems.length >= agencies.length) {
        selectedTodoItemsChangeAction([]);
      } else {
        selectedTodoItemsChangeAction(agencies.map((x) => x.id));
      }
    }
  };


  const initialState = {
    eid: '',
    ename: '',
    estreet_number: '',
    ehouse_number: '',
    ecity: '',
    epostal_code: 0,
    eco: '',
    ecountry: '',
  };
  const [agencyUpdate, setAgencyUpdate] = useState(initialState)

  const ref = useRef(null);
 

const updateAgency = (currentAgency)=>{
  ref.current.onClick();

  setAgencyUpdate({
    eid: currentAgency.id,
    ename: currentAgency.name, 
    estreet_number: currentAgency.Address.street_number,
    ehouse_number: currentAgency.Address.house_number,
    ecity:  currentAgency.Address.city,
    epostal_code: currentAgency.Address.postal_code,
    eco: currentAgency.Address.co,
    ecountry: currentAgency.Address.country
  });
  console.log("agency update data", currentAgency)

  // console.log(selectedItems)
  // document.getElementsByClassName('cell')[selectedItems].click()

  
 
// setAgencies(currentAgencies)ag
}
  // const { messages } = intl;

  return (
    <>
      <Row className="app-row survey-app">
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.agency" />
            </h1>
            <Breadcrumb  match={match} />
           
            {loading && (
              <div  className="text-zero top-right-button-container">
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
                      checked={selectedItems.length >= agencies.length}
                      onClick={() => handleChangeSelectAll()}
                      onChange={() => handleChangeSelectAll()}
                      label={
                        <span
                          className={`custom-control-label ${
                            selectedItems.length > 0 &&
                            selectedItems.length < agencies.length
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
                    <DropdownItem onClick={()=>{deleteAgencies(selectedItems)}}>
                      <IntlMessages id="todo.action" />
                    </DropdownItem>
                    <DropdownItem  onClick={() => {updateAgency(update)}}>
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
            {/* <Collapse
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
            </Collapse> */}
          </div>
          <Separator className="mb-5" />
          <Row>
            {loading ? (
              agencies.map((item, index) => (
                <AgencyListItem
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
      <AgencyModal
        toggleModal={() => setModalOpen(!modalOpen)}
        modalOpen={modalOpen}
      />
      <Button ref={ref} className='cell' hidden onClick={()=>{setEModalOpen(!emodalOpen)}}>
        update
      </Button>
      <UpdateAgencyModal
      selectedItems = {selectedItems}
      toggleModal={() => setEModalOpen(!emodalOpen)}
        emodalOpen={emodalOpen}
        agencyUpdate={agencyUpdate}
        setAgencyUpdate={setAgencyUpdate}
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
  })(AgencyApp)
);
