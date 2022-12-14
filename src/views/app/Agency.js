import React, { useState } from 'react';
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

const initialState = {
  name: '',
  street_number: '',
  house_number: '',
  city: '',
  postal_code: 0,
  co: '',
  country: '',
};

const Agency = ({ modalOpen = true, history }) => {
  // Local State
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // Functions
  const toggleModal = () => {
    history.goBack();
  };
  const addNewAgency = async () => {
   try{ const postal = parseInt(state.postal_code, 10);
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
      alert("worked")
      toggleModal();
    } else {
      alert('Error');
    }
  }catch(error){
    console.log("error in agency.js",error);
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
          defaultValue={state.name}
          onChange={(event) =>
            setState({ ...state, name: event.target.value })
          }
        />
        <Label className="mt-4">
          <IntlMessages id="agency.street_number" />
        </Label>
        <Input
          type="text"
          defaultValue={state.street_number}
          onChange={(event) =>
            setState({ ...state, street_number: event.target.value })
          }
        />
        {/* House Number */}
        <Label className="mt-4">
          <IntlMessages id="agency.house_number" />
        </Label>
        <Input
          type="text"
          defaultValue={state.house_number}
          onChange={(event) =>
            setState({ ...state, house_number: event.target.value })
          }
        />
        {/* City */}
        <Label className="mt-4">
          <IntlMessages id="agency.city" />
        </Label>
        <Input
          type="text"
          defaultValue={state.city}
          onChange={(event) => setState({ ...state, city: event.target.value })}
        />
        {/* Postal Code */}
        <Label className="mt-4">
          <IntlMessages id="agency.postal_code" />
        </Label>
        <Input
          type="text"
          defaultValue={state.postal_code}
          onChange={(event) =>
            setState({ ...state, postal_code: event.target.value })
          }
        />
        {/* Co */}
        <Label className="mt-4">
          <IntlMessages id="agency.co" />
        </Label>
        <Input
          type="text"
          defaultValue={state.co}
          onChange={(event) => setState({ ...state, co: event.target.value })}
        />
        {/* Country */}
        <Label className="mt-4">
          <IntlMessages id="agency.country" />
        </Label>
        <Input
          type="text"
          defaultValue={state.country}
          onChange={(event) =>
            setState({ ...state, country: event.target.value })
          }
        />
      </ModalBody>
      <ModalFooter>
        <Button
          disabled={loading}
          className={`${loading ? 'show-spinner' : ''}`}
          color="secondary"
          outline
          onClick={() => toggleModal}
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

export default Agency;
