import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import IntlMessages from 'helpers/IntlMessages';

import { addTodoItem } from 'redux/actions';
import { addNewUser, getAllAgenciesApi } from 'api';
import { NotificationManager } from 'components/common/react-notifications';

const initialState = {
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  role: '',
  agency: '',
  description: '',
  status: '',
};

const AddNewTodoModal = ({
  modalOpen,
  toggleModal,
  //   agency,
  // addTodoItemAction,

  roles,
}) => {
  const [state, setState] = useState(initialState);
  const [agencies, setAgencies] = useState([]);

  const loadAgencies = async () => {
    const res = await getAllAgenciesApi();
    if (res?.data) {
      setAgencies(res.data);
      // console.log(res.data);
    } else {
      NotificationManager.warning(
        'Network Issue!',
        'Error',
        3000,
        null,
        null,
        ''
      );
    }
  };

  useEffect(() => {
    loadAgencies();
  }, []);

  const addUser = async () => {
    const obj = {
      email: state.email,
      firstName: state.firstName,
      lastName: state.lastName,
      userName: state.userName,
      description: state.description,
      status: state.status,
      roles: state.role.value,
    };
    //  console.log(state.agency.value)

    // console.log("state",state);
    const res = await addNewUser(obj, state.agency.value);
     console.log("user",res)
    if (res?.data) {
      NotificationManager.success(
        'User Created Successfully!',
        'Success!',
        3000,
        null,
        null,
        ''
      );
      toggleModal();
      setState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        role: '',
        agency: '',
        description: '',
        status: '',
      });
    } else {
      NotificationManager.warning(
        'This User Already Exist',
        'Error!',
        3000,
        null,
        null,
        ''
      );
    }
  };

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="todo.add-new-title" />
      </ModalHeader>
      <ModalBody id="form">
        <Label className="mt-4">
          <IntlMessages id="todo.firstname" />
        </Label>
        <Input
          type="text"
          defaultValue={state.firstName}
          onChange={(event) =>
            setState({ ...state, firstName: event.target.value })
          }
        />
        <Label className="mt-4">
          <IntlMessages id="todo.lastname" />
        </Label>
        <Input
          type="text"
          defaultValue={state.lastName}
          onChange={(event) =>
            setState({ ...state, lastName: event.target.value })
          }
        />
        <Label className="mt-4">
          <IntlMessages id="todo.username" />
        </Label>
        <Input
          type="text"
          defaultValue={state.userName}
          onChange={(event) =>
            setState({ ...state, userName: event.target.value })
          }
        />
        <Label className="mt-4">
          <IntlMessages id="todo.email" />
        </Label>
        <Input
          type="email"
          defaultValue={state.email}
          onChange={(event) =>
            setState({ ...state, email: event.target.value })
          }
        />

        <Label className="mt-4">
          <IntlMessages id="todo.description" />
        </Label>
        <Input
          type="textarea"
          defaultValue={state.description}
          onChange={(event) =>
            setState({ ...state, description: event.target.value })
          }
        />

        <Label className="mt-4">
          <IntlMessages id="todo.role" />
        </Label>
        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          options={roles.map((x, i) => {
            return { label: x, value: x, key: i };
          })}
          value={state.role}
          onChange={(val) => setState({ ...state, role: val })}
        />
        <Label className="mt-4">
          <IntlMessages id="todo.agency" />
        </Label>
        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          options={agencies?.map((x, i) => {
            return {
              label: x.name,
              value: x.id,
              key: i,
              color: x.color,
            };
          })}
          value={state.agency}
          onChange={(val) => setState({ ...state, agency: val })}
        />

        <Label className="mt-4">
          <IntlMessages id="todo.status" />
        </Label>
        {['Active', 'In-Progress', 'Archieved'].map((itm, idx) => (
          <CustomInput
            key={idx?.toString()}
            type="radio"
            label={itm}
            checked={state.status === itm}
            onClick={() => {
              setState({ ...state, status: itm });
            }}
            onChange={() => {
              setState({ ...state, status: itm });
            }}
          />
        ))}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="todo.cancel" />
        </Button>
        <Button color="primary" onClick={() => addUser()}>
          Submit
        </Button>{' '}
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ todoApp }) => {
  const { agency, roles } = todoApp;
  return {
    agency,
    roles,
  };
};
export default connect(mapStateToProps, {
  addTodoItemAction: addTodoItem,
})(AddNewTodoModal);
