/* eslint-disable react/no-array-index-key */
import React, { useRef } from 'react';
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
import { updateAllAgenciesApi } from 'api';
import { NotificationManager } from 'components/common/react-notifications';
// import { updateAgencyApi } from 'api';

const UpdateAgencyModal = ({
  emodalOpen = true,
  toggleModal,
  agencyUpdate,
  setAgencyUpdate,
}) => {
  // const [ExistingAddress, setExistingAddress] = useState()
  //   // Local State
  //   if(agencyUpdate.Address!==null||agencyUpdate.Address!==undefined){

  //     console.log(' updateagecny ', agencyUpdate)
  //     setExistingAddress(agencyUpdate.Address)
  //   }
  // const [loading, setLoading] = useState(false);
  const refClose = useRef(null);
  // Functions
  //   const toggleModal = () => {
  //     history.goBack();
  //   };
  const updateAgency = async () => {
    refClose.current.onClick();
    console.log('main hu updateagecny modal', agencyUpdate);
    const postalCode = parseInt(agencyUpdate.epostal_code, 10)
    const obj = {
      "name": agencyUpdate.ename,
        "street_number": agencyUpdate.estreet_number,
        "house_number": agencyUpdate.ehouse_number,
        "city": agencyUpdate.ecity,
        "postal_code": postalCode,
        "co": agencyUpdate.eco,
        "country": agencyUpdate.ecountry
      
    }
    const res = await updateAllAgenciesApi(obj, agencyUpdate.id)
    if(res?.data){
      NotificationManager.success('Agency Updated Successfully!',"Success!",  3000, null, null, '');
      toggleModal();
      setAgencyUpdate({
        eid: '',
        ename: '',
        estreet_number: '',
        ehouse_number: '',
        ecity: '',
        epostal_code: 0,
        eco: '',
        ecountry: '',
      })
    } else {
      NotificationManager.warning('Agency Already Exist!',"Error!",  3000, null, null, '');
    }
  };

  const onChange = (e) => {
    setAgencyUpdate({ ...agencyUpdate, [e.target.name]: e.target.value });
  };
  // const onChangeName = (e)=>{
  //   setAgencyNameUpdate({...agencyNameUpdate, [e.target.name]: e.target.value})
  //  }
  // Return
  return (
    <Modal
      isOpen={emodalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="agency.etitle" />
      </ModalHeader>
      <ModalBody>
        {/* Street Number */}
        <Label className="mt-4">
          <IntlMessages id="agency.name" />
        </Label>
        <Input
          required
          type="text"
          name="ename"
          value={agencyUpdate.ename}
          onChange={onChange}
        />
        <Label className="mt-4">
          <IntlMessages id="agency.street_number" />
        </Label>
        <Input
          type="text"
          required
          name="estreet_number"
          value={agencyUpdate.estreet_number}
          onChange={onChange}
        />
        {/* House Number */}
        <Label className="mt-4">
          <IntlMessages id="agency.house_number" />
        </Label>
        <Input
          required
          type="text"
          name="ehouse_number"
          value={agencyUpdate.ehouse_number}
          onChange={onChange}
        />
        {/* City */}
        <Label className="mt-4">
          <IntlMessages id="agency.city" />
        </Label>
        <Input
          type="text"
          name="ecity"
          value={agencyUpdate.ecity}
          onChange={onChange}
        />
        {/* Postal Code */}
        <Label className="mt-4">
          <IntlMessages id="agency.postal_code" />
        </Label>
        <Input
          type="number"
          required
          name="epostal_code"
          value={agencyUpdate.epostal_code}
          onChange={onChange}
        />
        {/* Co */}
        <Label className="mt-4">
          <IntlMessages id="agency.co" />
        </Label>
        <Input
          type="text"
          name="eco"
          value={agencyUpdate.eco}
          onChange={onChange}
        />
        {/* Country */}
        <Label className="mt-4">
          <IntlMessages id="agency.country" />
        </Label>
        <Input
          type="text"
          name="ecountry"
          value={agencyUpdate.ecountry}
          onChange={onChange}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          // disabled={loading}
          // className={`${loading ? 'show-spinner' : ''}`}
          color="secondary"
          ref={refClose}
          outline
          onClick={toggleModal}
        >
          <IntlMessages id="agency.cancel" />
        </Button>
        <Button
          // disabled={loading}
          // className={`${loading ? 'show-spinner' : ''}`}
          color="primary"
          onClick={() => updateAgency()}
        >
          <IntlMessages id="agency.update" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateAgencyModal;
