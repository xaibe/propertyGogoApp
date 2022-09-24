import React, { useState } from 'react';
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


const initialState = {
  fullname: "",
  email: "",
  role: {},
  agency: {},
  description: "",
  status: 'PENDING',
};


const Agency = ({
  modalOpen,
  toggleModal,
  agency,
  roles,
  addTodoItemAction,
}) => {
  const [state, setState] = useState(initialState);

  const addNetItem = () => {
    const newItem = {
      fullname: state.fullname,
      email: state.email,
      role: state.role.value,
      agency: state.agency.value,
      status: state.status,
      description: state.description,
    };
    console.log(newItem)
    addTodoItemAction(newItem);
    toggleModal();
    setState(initialState);
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
      <ModalBody>
        <Label className="mt-4">
          <IntlMessages id="todo.fullname" />
        </Label>
        <Input
          type="text"
          defaultValue={state.fullname}
          onChange={(event) =>
            setState({ ...state, fullname: event.target.value })
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
          options={agency.map((x, i) => {
            return {
              label: x.label,
              value: x.label,
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
        <CustomInput
          type="radio"
          id="exCustomRadio"
          name="customRadio"
          label="COMPLETED"
          checked={state.status === 'COMPLETED'}
          onChange={(event) =>
            setState({
              ...state,
              status: event.target.value === 'on' ? 'COMPLETED' : 'PENDING',
            })
          }
        />
        <CustomInput
          type="radio"
          id="exCustomRadio2"
          name="customRadio2"
          label="PENDING"
          defaultChecked={state.status === 'PENDING'}
          onChange={(event) =>
            setState({
              ...state,
              status: event.target.value !== 'on' ? 'COMPLETED' : 'PENDING',
            })
          }
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="todo.cancel" />
        </Button>
        <Button color="primary" onClick={() => addNetItem()}>
          <IntlMessages id="todo.submit" />
        </Button>{' '}
      </ModalFooter>
    </Modal>
  );
};

export default Agency