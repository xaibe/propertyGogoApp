import React, { useRef } from 'react';
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
import {  updateAllUsers,  } from 'api';



const UpdateTodoModal = ({
  emodalOpen,
  toggleModal,
//   agency,
isUpdate,
setIsUpdate,
  roles,
}) => {
  
//   const [eagencies, seteAgencies] = useState([]);
  

//   const loadAgencies = async () => {
//     const res = await getAllAgenciesApi()
//     if (res?.data) {
//       seteAgencies(res.data);
//       console.log(res.data);
//     }
//    };
  
//   //  const onChange = (e)=>{
//   //   setIsUpdate({...isUpdate, [e.target.name]: e.target.value})
//   //  }

//    useEffect(() => {
//     loadAgencies();
//  }, []);

  const refClose = useRef(null)

  const addUser = async () => {
    refClose.current.onClick();
    console.log(isUpdate)
   const obj = {   
      "email": isUpdate.uemail,
      "name": isUpdate.uname,
      "description": isUpdate.edescription,
      "status": isUpdate.estatus,
      "roles": isUpdate.eroles.value
    }
    
   
   const res = await updateAllUsers(obj, isUpdate.id);
   if (res?.data) {
   
    toggleModal();
  } else {
    alert('Error');
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
          <IntlMessages id="todo.fullname" />
        </Label>
        <Input
        required
          type="text"
          name='uname'
          value={isUpdate.uname}
          onChange={(event) =>
            setIsUpdate({ ...isUpdate, uname: event.target.value })
          }
        />
        <Label className="mt-4">
          <IntlMessages id="todo.email" />
        </Label>
        <Input
          type="email"
          required
          name='uemail'
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
          name='edescription'
          value={isUpdate.edescription}
          onChange={(event) =>
            setIsUpdate({ ...isUpdate, edescription: event.target.value })
          }
        />

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
        <CustomInput
          type="radio"
          id="exCustomRadio"
          name="estatus"
          label="Active"
          checked={isUpdate.estatus === 'Active'}
          onChange={(event) =>
            setIsUpdate({
              ...isUpdate,
              status: event.target.value === 'on' ? 'Active' : '',
            })
          }
        />
        <CustomInput
          type="radio"
          id="exCustomRadio2"
          name="estatus"
          label="In-Progress"
          checked={isUpdate.estatus === 'In-Progress'}
          onChange={(event) =>
            setIsUpdate({
              ...isUpdate,
              status: event.target.value === 'on' ? 'In-Progress' : '',
            })}
        />
        <CustomInput
          type="radio"
          id="exCustomRadio4"
          name="estatus"
          label="Archieved"
          checked={isUpdate.estatus === 'Archieved'}
          onChange={(event) =>
            setIsUpdate({
              ...isUpdate,
              status: event.target.value === 'on' ? 'Archieved' : '',
            })}
        />
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
