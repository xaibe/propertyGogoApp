import React, { useEffect, useRef, useState } from 'react';
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
import { updateAllUsers } from 'api';
import { NotificationManager } from 'components/common/react-notifications';

const UpdateTodoModal = ({
  emodalOpen,
  toggleModal,
  //   agency,
  isUpdate,
  setIsUpdate,
  roles,
  setUpdate,
}) => {
  const [isUpdateErrors, setIsUpdateErrors] = useState({});
  useEffect(() => {
    if (Object.keys(isUpdateErrors).length === 0) {
      console.log(isUpdate);
    }
  }, [isUpdateErrors]);

  const validate = () => {
    const errors = {};

    if (!isUpdate.ufirstName) {
      errors.firstName = 'please, enter your first name';
    }
    if (!isUpdate.ulastName) {
      errors.lastName = 'please, enter your last name';
    }
    if (!isUpdate.uuserName) {
      errors.userName = 'please, enter your username';
    }
    if (!isUpdate.edescription) {
      errors.description = 'please, enter your description';
    }
    if (!isUpdate.erole) {
      errors.role = 'please, select your role';
    }

    return errors;
  };

  const refClose = useRef(null);

  const addUser = async () => {
    setIsUpdateErrors(validate(isUpdate));
    refClose.current.onClick();

    if (isUpdate.ufirstName === 0) {
      NotificationManager.warning(
        'PLease Fill all required data',
        'Error!',
        3000,
        null,
        null,
        ''
      );
    } else {
      const obj = {
        email: isUpdate.uemail,
        firstName: isUpdate.ufirstName,
        userName: isUpdate.uuserName,
        lastName: isUpdate.ulastName,
        description: isUpdate.edescription,
        status: isUpdate.estatus,
        roles: isUpdate.eroles.value,
      };

      const res = await updateAllUsers(obj, isUpdate.id);
      if (res?.data) {
        NotificationManager.success(
          'User Updated Successfully!',
          'Success!',
          3000,
          null,
          null,
          ''
        );
        setUpdate('');
        toggleModal();
      } else {
        NotificationManager.warning(
          'User Alreacy Exist!',
          'Error!',
          3000,
          null,
          null,
          ''
        );
        setUpdate('');
      }
    }
  };

  return (
    <Modal
      isOpen={emodalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="todo.update-title" />
      </ModalHeader>
      <ModalBody>
        <Label className="mt-4">
          <IntlMessages id="todo.firstname" />
        </Label>
        <Input
          required
          type="text"
          name="uname"
          value={isUpdate.ufirstName}
          onChange={(event) =>
            setIsUpdate({ ...isUpdate, ufirstName: event.target.value })
          }
        />
        <p style={{ color: 'red', textAlign: 'center', margin: '0' }}>
          {isUpdateErrors.ufirstName}
        </p>
        <Label className="mt-4">
          <IntlMessages id="todo.lastname" />
        </Label>
        <Input
          required
          type="text"
          name="uname"
          value={isUpdate.ulastName}
          onChange={(event) =>
            setIsUpdate({ ...isUpdate, ulastName: event.target.value })
          }
        />
        <p style={{ color: 'red', textAlign: 'center', margin: '0' }}>
          {isUpdateErrors.ulastName}
        </p>
        <Label className="mt-4">
          <IntlMessages id="todo.username" />
        </Label>
        <Input
          required
          type="text"
          name="uname"
          value={isUpdate.uuserName}
          onChange={(event) =>
            setIsUpdate({ ...isUpdate, uuserName: event.target.value })
          }
        />
        <p style={{ color: 'red', textAlign: 'center', margin: '0' }}>
          {isUpdateErrors.uuserName}
        </p>
        <Label className="mt-4">
          <IntlMessages id="todo.email" />
        </Label>
        <Input
          type="email"
          required
          disabled
          name="uemail"
          value={isUpdate.uemail}
          onChange={(event) =>
            setIsUpdate({ ...isUpdate, uemail: event.target.value })
          }
        />

        <Label className="mt-4">
          <IntlMessages id="todo.description" />
        </Label>
        <Input
          type="textarea"
          name="edescription"
          value={isUpdate.edescription}
          onChange={(event) =>
            setIsUpdate({ ...isUpdate, edescription: event.target.value })
          }
        />
        <p style={{ color: 'red', textAlign: 'center', margin: '0' }}>
          {isUpdateErrors.edescription}
        </p>
        <Label className="mt-4">
          <IntlMessages id="todo.role" />
        </Label>
        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="eroles"
          options={roles.map((x, i) => {
            return { label: x, value: x, key: i };
          })}
          value={isUpdate.eroles}
          onChange={(val) => setIsUpdate({ ...isUpdate, eroles: val })}
        />
        <p style={{ color: 'red', textAlign: 'center', margin: '0' }}>
          {isUpdateErrors.eroles}
        </p>
        {/* <Label className="mt-4">
          <IntlMessages id="todo.agency" />
        </Label>
        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="eagency"
          options={eagencies?.map((x, i) => {
            return {
              label: x.name,
              value: x.id,
              key: i,
              color: x.color,
            };
          })}
          hidden
          value={isUpdate.eagency}
          onChange={(val) => setIsUpdate({ ...isUpdate, eagency: val })}
        /> */}

        <Label className="mt-4">
          <IntlMessages id="todo.status" />
        </Label>
        {['Active', 'In-Progress', 'Archieved'].map((itm, idx) => (
          <CustomInput
            key={idx?.toString()}
            type="radio"
            label={itm}
            checked={isUpdate.status === itm}
            onClick={() => {
              setIsUpdate({ ...isUpdate, status: itm });
            }}
            onChange={() => {
              setIsUpdate({ ...isUpdate, status: itm });
            }}
          />
        ))}
      </ModalBody>
      <ModalFooter>
        <Button ref={refClose} color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="todo.cancel" />
        </Button>
        <Button color="primary" onClick={() => addUser()}>
          <IntlMessages id="todo.update" />
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
})(UpdateTodoModal);
