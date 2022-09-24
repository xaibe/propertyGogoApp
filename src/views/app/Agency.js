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
    setLoading(true);
    const res = await addNewAgencyApi(state);
    setLoading(false);
    if (res?.data) {
      toggleModal();
    } else {
      alert('Error');
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
