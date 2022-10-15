import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { addNewAgencyApi } from 'api';
import { NotificationManager } from 'components/common/react-notifications';

const initialState = {
  name: '',
  street_number: '',
  house_number: '',
  city: '',
  postal_code: 0,
  co: '',
  country: '',
};


// const validateName = (value) => {
//   let error;
//   // const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
//   if (!value) {
//     error = 'Please enter your Name';
//   } else if (value.length < 4) {
//     error = 'Value must be longer than 3 characters';
//   } 
// }
const AgencyModal = ({ modalOpen = true, toggleModal }) => {
  // Local State
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [stateErrors, setStateErrors] = useState({});
  useEffect(()=>{
    if(Object.keys(stateErrors).length === 0 ){
      console.log(state);
    }
},[stateErrors])
  
  
  const validate = ()=>{
    const errors = {};
    
    if(!state.name){
      errors.name = "please, enter your agency name"
    }
    if(!state.street_number){
      errors.street_number = "please, enter your street no."
    }
    if(!state.house_number){
      errors.house_number = "please, enter your house no."
    }
    if(!state.postal_code){
      errors.postal_code = "please, enter your postal code"
    }
    if(!state.city){
      errors.city = "please, enter your city"
    }
    if(!state.co){
      errors.co = "please, select your co"
    }
    if(!state.country){
      errors.country = "please, select your country"
    }
    return errors;
  }
  // Functions
//   const toggleModal = () => {
//     history.goBack();
//   };
  const addNewAgency = async () => {
    setStateErrors(validate(state))
if(state.name.length === 0 ) {
  NotificationManager.warning(
    'PLease Fill all required data',
    'Error!',
    3000,
    null,
    null,
    ''
  );
} else {
   try{ 
    const postal = parseInt(state.postal_code, 10);
    const obj = {
        "street_number": state.street_number,
        "house_number": state.house_number,
        "city": state.city,
        "postal_code": postal,
        "co": state.co,
        "country": state.country  
    }
    console.log(state);
    setLoading(true);
    const res = await addNewAgencyApi(obj, state.name);
    console.log("res",res);
    setLoading(false);
    
    if (res?.data) {
      NotificationManager.success('Agency Created Successfully!',"Success!",  3000, null, null, '');
      setState({
        name: '',
        street_number: '',
        house_number: '',
        city: '',
        postal_code: 0,
        co: '',
        country: '',
      });
      toggleModal();
      
    } else if (res.status === "404"){
     
      NotificationManager.warning('Values cannot be empty!',"Error!",  3000, null, null, '');
    } else {
      NotificationManager.warning('Agency already Exist!',"Error!",  3000, null, null, '');
    }
  }catch(error){
    console.log("error in agency.js",error);
  }
}
  };


  // Return
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="agency.title" />
      </ModalHeader>
      <ModalBody>
        {/* Street Number */}
        <Label className="mt-4">
          <IntlMessages id="agency.name" />
        </Label>
        <Input
          type="text"
          required
          aria-required
          // validate={validateName}
          defaultValue={state.name}
          onChange={(event) =>
            setState({ ...state, name: event.target.value })
          }
        />
        <p style={{color: "red", textAlign: "center", margin: "0"}}>{stateErrors.name}</p>
        <Label className="mt-4">
          <IntlMessages id="agency.street_number" />
        </Label>
        <Input
          type="text"
          required
          defaultValue={state.street_number}
          onChange={(event) =>
            setState({ ...state, street_number: event.target.value })
          }
        />
        <p style={{color: "red", textAlign: "center", margin: "0"}}>{stateErrors.street_number}</p>
        {/* House Number */}
        <Label className="mt-4">
          <IntlMessages id="agency.house_number" />
        </Label>
        <Input
          type="text"
          required
          defaultValue={state.house_number}
          onChange={(event) =>
            setState({ ...state, house_number: event.target.value })
          }
        />
        {/* City */}<p style={{color: "red", textAlign: "center", margin: "0"}}>{stateErrors.house_number}</p>
        <Label className="mt-4">
          <IntlMessages id="agency.city" />
        </Label>
        <Input
          type="text"
          required
          defaultValue={state.city}
          onChange={(event) => setState({ ...state, city: event.target.value })}
        />
        {/* Postal Code */} <p style={{color: "red", textAlign: "center", margin: "0"}}>{stateErrors.city}</p>
        <Label className="mt-4">
          <IntlMessages id="agency.postal_code" />
        </Label>
        <Input
          type="text"
          required
          defaultValue={state.postal_code}
          onChange={(event) =>
            setState({ ...state, postal_code: event.target.value })
          }
        />
        {/* Co */}<p style={{color: "red", textAlign: "center", margin: "0"}}>{stateErrors.postal_code}</p>
        <Label className="mt-4">
          <IntlMessages id="agency.co" />
        </Label>
        <Input
          type="text"
          required
          defaultValue={state.co}
          onChange={(event) => setState({ ...state, co: event.target.value })}
        />
        {/* Country */} <p style={{color: "red", textAlign: "center", margin: "0"}}>{stateErrors.co}</p>
        <Label className="mt-4">
          <IntlMessages id="agency.country" />
        </Label>
        <Input
          type="text"
          required
          defaultValue={state.country}
          onChange={(event) =>
            setState({ ...state, country: event.target.value })
          }
        />
        <p style={{color: "red", textAlign: "center", margin: "0"}}>{stateErrors.country}</p>
      </ModalBody>
      <ModalFooter>
        <Button
          disabled={loading}
          className={`${loading ? 'show-spinner' : ''}`}
          color="secondary"
          outline
          onClick={toggleModal}
        >
          <IntlMessages id="agency.cancel" />
        </Button>
        <Button
          disabled={loading}
          className={`${loading ? 'show-spinner' : ''}`}
          color="primary"
          onClick={() => addNewAgency()}
        >
          <IntlMessages id="agency.submit" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AgencyModal;
