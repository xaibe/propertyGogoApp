import React, { useState, useRef, useEffect } from 'react';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  // CardImg,
  CardText,
  // Button,
  Col,
  Button,
  ModalHeader,
  ModalBody,
  Modal,
  ModalFooter,
  CustomInput,
  Label,
  Input,
  
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
// import DropzoneExample from 'containers/forms/DropzoneExample';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
// import ThumbnailImage from 'components/cards/ThumbnailImage';
import ThumbnailLetters from 'components/cards/ThumbnailLetters';
import { adminRoot } from 'constants/defaultValues';
import { addAddressApi,  updateAllUsers, updateProfileAddressApi, uploadImages } from 'api';
import { NotificationManager } from 'components/common/react-notifications';
import ReactSelect from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { connect } from 'react-redux';
import ThumbnailImage from 'components/cards/ThumbnailImage';

const UserCardExamples = ({ user, roles }) => {
  const [modalRight, setModalRight] = useState(false);
  const [ContactModal, setContactModal] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [addressUpdateModal, setAddressUpdateModal] = useState(false)
  const [data] = useState(user);
  const [userId] = useState(user);
  // open modals
const openAddressUpdateModal = useRef(null);
const openContactUpdate = useRef(null)
const openUserModal = useRef(null);
// close modals
  const modalRightClose = useRef(null);
  const ContactModalClose = useRef(null);
  const addressModalClose = useRef(null);
  const userModalClose = useRef(null);
  const [userState, setUserState] = useState({
    uid: '',
    euserName: '',
    eroles: '',
  });
const handleUserUpdate = (updateUser)=>{
  openUserModal.current.onClick();
  setUserState({
    uid: updateUser.id,
    eroles: updateUser.roles,
    euserName: updateUser.userName,
  });
}
  const handleUserSubmit = async () => {
    userModalClose.current.onClick();
    
    const obj = {
      "userName": userState.euserName,
      "roles": userState.eroles.value,
    };
    const res = await updateAllUsers(obj, userState.uid);
    console.log("res",res)
    if (res?.data) {
      NotificationManager.success(
        'User Info Updated Successfully! Please relogin to see changes',
        'Success!',
        3000,
        null,
        null,
        ''
      );
      setUserState({
        uid: '',
        euserName: '',
        eroles: '',
      });

    } else {
      NotificationManager.warning(
        'Error Network Issue!',
        'Error!',
        3000,
        null,
        null,
        ''
      );
    }
  };
  console.log("user data",data);
  const [state, setState] = useState({
    id: '',
    firstName: '',
    lastName: '',
    userName: '',
    status: '',
  });
  const handleContactUpdate = (updateDetails)=>{
    openContactUpdate.current.onClick();
    setState({
      id: updateDetails.id,
      firstName: updateDetails.firstName,
      lastName: updateDetails.lastName,
      userName: updateDetails.userName,
      status: updateDetails.status
    });
  }
  const handleSubmit = async () => {
    ContactModalClose.current.onClick();
    const obj = {
      "firstName": state.firstName,
      "userName": state.userName,
      "lastName": state.lastName,
      "status": state.status,
    };
    const res = await updateAllUsers(obj, state.id);
    if (res?.data) {
      NotificationManager.success(
        'User Details Updated Successfully! Please relogin to see changes',
        'Success!',
        3000,
        null,
        null,
        ''
      );
      setState({
        id: '',
        firstName: '',
        lastName: '',
        userName: '',
        status: '',
      });
    } else {
      NotificationManager.warning(
        'Error Network Issue!',
        'Error!',
        3000,
        null,
        null,
        ''
      );
    }
  };
  const [imagesSelected, setImagesSelected] = useState('');
  const [preview, setPreview] = useState();
  useEffect(() => {
    if (!imagesSelected) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(imagesSelected);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    // return () => URL.revokeObjectURL(objectUrl)
  }, [imagesSelected]);

  const handlePictureSubmit = () => {
    modalRightClose.current.onClick();
    const imageData = new FormData();
    imageData.append('file', imagesSelected);
    // setLoading(true);

    console.log('this is a imagessletecd', imagesSelected);

    const res =  uploadImages(imageData);
    if(res){
      NotificationManager.success(
        'Image Updated Succesfully!, Please relogin to see changes',
        'Success!',
        3000,
        null,
        null,
        ''
      );
      setImagesSelected('');
      setPreview('');

    } else {
      NotificationManager.warning(
        'Network Issue!',
        'Error!',
        3000,
        null,
        null,
        ''
      );
    }
    const file = res.data;

    console.log("main hu file",file);
  };
  const [addressData, setAddressData] = useState({
    street_number: '',
    house_number: '',
    city: '',
    postal_code: 0,
    co: '',
    country: '',
  });
  const handleAddressSubmit = async () => {
    addressModalClose.current.onClick();
    console.log('address', addressData);
    try {
      const postal = parseInt(addressData.postal_code, 20);
      const obj = {
        "street_number": addressData.street_number,
        "house_number": addressData.house_number,
        "city": addressData.city,
        "postal_code": postal,
        "co": addressData.co,
        "country": addressData.country,
      };

      const res = await addAddressApi(obj, userId.id);
      console.log('res', res);

      if (res?.data) {
        NotificationManager.success(
          'Address Added SuccessFully! Please relogin to see changes',
          'Success',
          3000,
          null,
          null,
          ''
        );
        setAddressData({
          street_number: '',
          house_number: '',
          city: '',
          postal_code: 0,
          co: '',
          country: '',
        });
      } else {
        NotificationManager.warning(
          'Address Adding failed due to Network Issue',
          'Error',
          3000,
          null,
          null,
          ''
        );
      }
    } catch (error) {
      console.log('error in agency.js', error);
    }
  };

  const [addressUpdateData, setAddressUpdateData] = useState({
    id:'',
    estreet_number: '',
    ehouse_number: '',
    ecity: '',
    epostal_code: 0,
    eco: '',
    ecountry: '',
  })

  const handleAddressUpdateData =  (currentUpdateData)=>{
    openAddressUpdateModal.current.onClick();
    setAddressUpdateData({
      id:currentUpdateData.Address.id,
    estreet_number: currentUpdateData.Address.street_number,
    ehouse_number: currentUpdateData.Address.house_number,
    ecity: currentUpdateData.Address.city,
    epostal_code: currentUpdateData.Address.postal_code,
    eco: currentUpdateData.Address.co,
    ecountry: currentUpdateData.Address.country,
    })
  }

  const SubmitAddressUpdateModal = async()=>{
    modalRightClose.current.onClick();
    const postalCode = parseInt(addressUpdateData.epostal_code, 10)
    const obj = {
      "street_number": addressUpdateData.estreet_number,
        "house_number": addressUpdateData.ehouse_number,
        "city": addressUpdateData.ecity,
        "postal_code": postalCode,
        "co": addressUpdateData.eco,
        "country": addressUpdateData.ecountry
    }
    const res = await updateProfileAddressApi(obj, addressUpdateData.id);
    if (res?.data) {
      NotificationManager.success(
        'User Address Updated Successfully! Please relogin to see changes',
        'Success!',
        3000,
        null,
        null,
        ''
      );
      setAddressUpdateData({
        id:'',
        estreet_number: '',
        ehouse_number: '',
        ecity: '',
        epostal_code: 0,
        eco: '',
        ecountry: '',
      })
    } else {
      NotificationManager.warning(
        'Error Network Issue!',
        'Error!',
        3000,
        null,
        null,
        ''
      );
    }
  }
  return (
    <Row>
      <Colxx xxs="12">
        <Row>
          <Colxx md="5" sm="5" lg="5" xxs="12">
            <Card className="mb-4">
              <CardTitle
                className=" mt-3 "
                style={{ borderBottom: '0.5px solid grey' }}
              >
                <div style={{ marginLeft: '20px' }}>
                  <IntlMessages id="cards.user-card" />
                </div>
              </CardTitle>
              <CardBody style={{ padding: '8px' }}>
                <div className="text-center">
                  {/* <CardImg
                    top
                    src="/assets/img/profiles/l-1.jpg"
                    alt="Card image cap"
                    className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail"
                  /> */}
                  <div
                    style={{
                      display: 'grid',
                      justifyContent: 'center',
                      matginLeft: '10px',
                      gridTemplateColumns: '100px 100px',
                      rowGap: '15px',
                      columnGap: '3%',
                    }}
                  >
                    <div>
                      <NavLink to={`${adminRoot}/cards`}>
                        <CardSubtitle className="mb-1">User Role</CardSubtitle>
                      </NavLink>
                      <CardText className="text-muted text-small mb-4">
                        {user.roles}
                      </CardText>
                    </div>
                    <div>
                      <Col>
                        <NavLink to={`${adminRoot}/cards`}>
                          <CardSubtitle className="mb-1">
                            User Name
                          </CardSubtitle>
                        </NavLink>
                        <CardText className="text-muted text-small mb-4">
                          {user.userName}
                        </CardText>
                      </Col>
                    </div>
                    {/* <div>
                      <Col>
                        <NavLink to={`${adminRoot}/cards`}>
                          <CardSubtitle className="mb-1">
                            Last Activity
                          </CardSubtitle>
                        </NavLink>
                        <CardText className="text-muted text-small mb-4">
                          N/A
                        </CardText>
                      </Col>
                    </div>
                    <div>
                      <Col>
                        <NavLink to={`${adminRoot}/cards`}>
                          <CardText className="mb-1">
                            inform user about recent request
                          </CardText>
                        </NavLink>
                        <CardText className="text-muted text-small mb-4">
                          No
                        </CardText>
                      </Col> */}
                    {/* </div> */}
                  </div>
                  <Button
                    outline
                    size="sm"
                    color="primary"
                    onClick={() => handleUserUpdate(user)}
                  >
                    Edit
                  </Button>
                  <Button ref={openUserModal} hidden onClick={()=>setUserModal(true)}>
                    open
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Colxx>
          <Modal
            isOpen={userModal}
            toggle={() => setUserModal(!userModal)}
            wrapClassName="modal-right"
          >
            <ModalHeader>Modal title</ModalHeader>
            <ModalBody>
              <Label className="mt-4">
                <IntlMessages id="todo.role" />
              </Label>
              <ReactSelect
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="eroles"
                options={roles.map((x, i) => {
                  return { label: x, value: x, key: i };
                })}
                Value={userState.eroles}
                onChange={(val) => setUserState({ ...userState, eroles: val })}
              />
              <Label className="mt-4">
                <IntlMessages id="todo.username" />
              </Label>
              <Input
                type="text"
                value={userState.euserName}
                onChange={(event) =>
                  setUserState({ ...userState, euserName: event.target.value })
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button
                form="my-form"
                color="primary"
                onClick={() => handleUserSubmit()}
              >
                Submit
              </Button>{' '}
              <Button
                color="secondary"
                ref={userModalClose}
                onClick={() => setUserModal(false)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <Colxx md="7" sm="7" lg="7" xxs="12">
            <Card className="mb-4">
              <CardTitle
                className=" mt-3 "
                style={{ borderBottom: '0.5px solid grey' }}
              >
                <div style={{ marginLeft: '20px' }}>
                  <IntlMessages id="cards.user-contact" />
                </div>
              </CardTitle>
              <CardBody style={{ padding: '18px' }}>
                <div className="text-center">
                  {/* <CardImg
                    top
                    src="/assets/img/profiles/l-1.jpg"
                    alt="Card image cap"
                    className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail"
                  /> */}
                  <div
                    style={{
                      display: 'grid',
                      justifyContent: 'center',
                      gridTemplateColumns: '100px 100px 100px',
                      rowGap: '15px',
                      columnGap: '3%',
                      marginLeft: '20px',
                    }}
                  >
                    <div>
                      <NavLink to={`${adminRoot}/cards`}>
                        <CardSubtitle className="mb-1">Status</CardSubtitle>
                      </NavLink>
                      <CardText className="text-muted text-small mb-4">
                        {user.status}
                      </CardText>
                    </div>
                    <div>
                      <Col>
                        <NavLink to={`${adminRoot}/cards`}>
                          <CardSubtitle className="mb-1">
                            Display Name
                          </CardSubtitle>
                        </NavLink>
                        <CardText className="text-muted text-small mb-4">
                          {user.userName}
                        </CardText>
                      </Col>
                    </div>
                    <div>
                      <Col>
                        <NavLink to={`${adminRoot}/cards`}>
                          <CardSubtitle className="mb-1">
                            Last Name
                          </CardSubtitle>
                        </NavLink>
                        <CardText className="text-muted text-small mb-4">
                          {user.lastName}
                        </CardText>
                      </Col>
                    </div>
                    <div>
                      <Col>
                        <NavLink to={`${adminRoot}/cards`}>
                          <CardText className="mb-1">First Name</CardText>
                        </NavLink>
                        <CardText className="text-muted text-small mb-4">
                          {user.firstName}
                        </CardText>
                      </Col>
                    </div>
                    {/* <div>
                      <Col>
                        <NavLink to={`${adminRoot}/cards`}>
                          <CardText className="mb-1">Language</CardText>
                        </NavLink>
                        <CardText className="text-muted text-small mb-4">
                          German
                        </CardText>
                      </Col>
                    </div>
                    <div>
                      <Col>
                        <NavLink to={`${adminRoot}/cards`}>
                          <CardText className="mb-1">Letter Saluation</CardText>
                        </NavLink>
                        <CardText className="text-muted text-small mb-4">
                          Good Day
                        </CardText>
                      </Col>
                    </div> */}
                  </div>
                  <Button
                    onClick={() => {
                      handleContactUpdate(user);
                    }}
                    outline
                    size="sm"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button hidden ref={openContactUpdate}  onClick={() => {
                      setContactModal(true);
                    }}>
                    open
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Colxx>
          <Modal
            isOpen={ContactModal}
            toggle={() => setContactModal(!ContactModal)}
            wrapClassName="modal-right"
          >
            <ModalHeader>Update Contact Details</ModalHeader>
            <ModalBody>
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
                <IntlMessages id="todo.displayname" />
              </Label>
              <Input
                type="text"
                defaultValue={state.userName}
                onChange={(event) =>
                  setState({ ...state, userName: event.target.value })
                }
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
              <Button
                form="my-form"
                color="primary"
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>{' '}
              <Button
                color="secondary"
                ref={ContactModalClose}
                onClick={() => setContactModal(false)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          {/* <Colxx md="6" sm="6" lg="4" xxs="12">
            <Card className="d-flex flex-row mb-4">
              <NavLink to={`${adminRoot}/cards`} className="d-flex">
                <ThumbnailImage
                  rounded
                  src="/assets/img/profiles/l-1.jpg"
                  alt="Card image cap"
                  className="m-4"
                />
              </NavLink>
              <div className=" d-flex flex-grow-1 min-width-zero">
                <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                  <div className="min-width-zero">
                    <NavLink to={`${adminRoot}/cards`}>
                      <CardSubtitle className="truncate mb-1">
                        Sarah Kortney
                      </CardSubtitle>
                    </NavLink>
                    <CardText className="text-muted text-small mb-2">
                      Executive Director
                    </CardText>
                    <Button outline size="xs" color="primary">
                      Edit
                    </Button>
                  </div>
                </CardBody>
              </div>
            </Card>

            <Card className="d-flex flex-row mb-4">
              <NavLink to={`${adminRoot}/cards`} className="d-flex">
                <ThumbnailLetters
                  rounded
                  text="Sarah Kortney"
                  className="m-4"
                />
              </NavLink>
              <div className=" d-flex flex-grow-1 min-width-zero">
                <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                  <div className="min-width-zero">
                    <NavLink to={`${adminRoot}/cards`}>
                      <CardSubtitle className="truncate mb-1">
                        Sarah Kortney
                      </CardSubtitle>
                    </NavLink>
                    <CardText className="text-muted text-small mb-2">
                      Executive Director
                    </CardText>
                    <Button outline size="xs" color="primary">
                      Edit
                    </Button>
                  </div>
                </CardBody>
              </div>
            </Card>
          </Colxx> */}

          {/* <Colxx md="6" sm="6" lg="4" xxs="12">
            <Card className="d-flex flex-row mb-4">
              <NavLink to={`${adminRoot}/cards`} className="d-flex">
                <ThumbnailImage
                  rounded
                  small
                  src="/assets/img/profiles/l-1.jpg"
                  alt="profile"
                  className="m-4"
                />
              </NavLink>
              <div className=" d-flex flex-grow-1 min-width-zero">
                <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                  <div className="min-width-zero">
                    <NavLink to={`${adminRoot}/cards`}>
                      <CardSubtitle className="truncate mb-1">
                        Sarah Kortney
                      </CardSubtitle>
                    </NavLink>
                    <CardText className="text-muted text-small mb-2">
                      Executive Director
                    </CardText>
                  </div>
                </CardBody>
              </div>
            </Card>

            <Card className="d-flex flex-row mb-4">
              <NavLink to={`${adminRoot}/cards`} className="d-flex">
                <ThumbnailLetters
                  rounded
                  small
                  text="Sarah Kortney"
                  className="m-4"
                />
              </NavLink>
              <div className=" d-flex flex-grow-1 min-width-zero">
                <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                  <div className="min-width-zero">
                    <NavLink to={`${adminRoot}/cards`}>
                      <CardSubtitle className="truncate mb-1">
                        Sarah Kortney
                      </CardSubtitle>
                    </NavLink>
                    <CardText className="text-muted text-small mb-2">
                      Executive Director
                    </CardText>
                  </div>
                </CardBody>
              </div>
            </Card>
          </Colxx> */}
        </Row>
        <Row>
          <Colxx md="5" sm="5" lg="5" xxs="12">
            <Card className="mb-4">
              <CardBody>
                <div className="text-center">
                  <div
                    className="text-center d-flex "
                    style={{ flexDirection: 'column' }}
                  >
                    {data.ImageUrl !== null || data.ImageUrl !== undefined ? 
                    <ThumbnailImage
                    rounded
                    src={data.ImageUrl}
                    alt="Card image cap"
                    className="m-4"
                  /> :  
              <ThumbnailLetters
                  rounded
                  small
                  text={data?.userName}
                />
             }
                  </div>
                  <Button
                    outline
                    size="sm"
                    color="primary"
                    onClick={() => setModalRight(true)}
                  >
                    Edit
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Colxx>
          <Modal
            isOpen={modalRight}
            toggle={() => setModalRight(!modalRight)}
            wrapClassName="modal-right"
          >
            <ModalHeader>Change Profile</ModalHeader>
            <ModalBody>
              <Input
                type="file"
                onChange={(event) => {
                  setImagesSelected(event.target.files[0]);
                }}
                id="file"
              />
              <div className="result">
                {imagesSelected && (
                  <img
                    src={preview}
                    alt="Selected Images"
                    style={{
                      width: '300px',
                      height: '300px',
                      borderRadius: '150px',
                      objectFit: 'cover',
                      objectPosition: '1px 10%',
                    }}
                  />
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                form="my-form"
                color="primary"
                onClick={handlePictureSubmit}
              >
                Submit
              </Button>{' '}
              <Button
                color="secondary"
                ref={modalRightClose}
                onClick={() => setModalRight(false)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <Colxx md="7" sm="7" lg="7" xxs="12">
            <Card className="mb-4">
              <CardTitle
                className=" mt-3 "
                style={{ borderBottom: '0.5px solid grey' }}
              >
                <div style={{ marginLeft: '20px' }}>
                  <IntlMessages id="cards.user-address" />
                </div>
              </CardTitle>
              <CardBody style={{ padding: '18px' }}>
                <div className="text-center">
                  {data.Address && (
                    <>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'auto auto auto',
                          rowGap: '15px',
                          columnGap: '3%',
                        }}
                      >
                        <div>
                          <NavLink to={`${adminRoot}/cards`}>
                            <CardSubtitle className="mb-1">
                              House No.
                            </CardSubtitle>
                          </NavLink>
                          <CardText className="text-muted text-small mb-4">
                            {user.Address.house_number}
                          </CardText>
                        </div>
                        <div>
                          <Col>
                            <NavLink to={`${adminRoot}/cards`}>
                              <CardSubtitle className="mb-1">
                                Street No.
                              </CardSubtitle>
                            </NavLink>
                            <CardText className="text-muted text-small mb-4">
                              {user.Address.street_number}
                            </CardText>
                          </Col>
                        </div>
                        <div>
                          <Col>
                            <NavLink to={`${adminRoot}/cards`}>
                              <CardSubtitle className="mb-1">City</CardSubtitle>
                            </NavLink>
                            <CardText className="text-muted text-small mb-4">
                              {user.Address.city}
                            </CardText>
                          </Col>
                        </div>
                        <div>
                          <Col>
                            <NavLink to={`${adminRoot}/cards`}>
                              <CardText className="mb-1">Country</CardText>
                            </NavLink>
                            <CardText className="text-muted text-small mb-4">
                              {user.Address.country}
                            </CardText>
                          </Col>
                        </div>
                        <div>
                          <Col>
                            <NavLink to={`${adminRoot}/cards`}>
                              <CardText className="mb-1">Postal Code</CardText>
                            </NavLink>
                            <CardText className="text-muted text-small mb-4">
                              {user.Address.postal_code}
                            </CardText>
                          </Col>
                        </div>
                        <div>
                          <Col>
                            <NavLink to={`${adminRoot}/cards`}>
                              <CardText className="mb-1">Co.</CardText>
                            </NavLink>
                            <CardText className="text-muted text-small mb-4">
                              {user.Address.co}
                            </CardText>
                          </Col>
                        </div>
                        
                      </div>
                      <Button
                          outline
                          size="md"
                          color="primary"
                          onClick={()=>{handleAddressUpdateData(user)}}
                        >
                          Edit
                        </Button>
                        <Button  hidden ref={openAddressUpdateModal} onClick={()=>{setAddressUpdateModal(true)}}>
                          open</Button>{' '}
                        <Modal
            isOpen={addressUpdateModal}
            toggle={() => setAddressUpdateModal(!addressUpdateModal)}
            wrapClassName="modal-right"
          >
            <ModalHeader>Change Profile</ModalHeader>
            <ModalBody>
            
                            <Label className="mt-4">
                              <IntlMessages id="agency.street_number" />
                            </Label>
                            <Input
                              type="text"
                              defaultValue={addressUpdateData.estreet_number}
                              onChange={(event) =>
                                setAddressUpdateData({
                                  ...addressUpdateData,
                                  estreet_number: event.target.value,
                                })
                              }
                            />
                            {/* House Number */}
                            <Label className="mt-4">
                              <IntlMessages id="agency.house_number" />
                            </Label>
                            <Input
                              type="text"
                              defaultValue={addressUpdateData.ehouse_number}
                              onChange={(event) =>
                                setAddressUpdateData({
                                  ...addressUpdateData,
                                  ehouse_number: event.target.value,
                                })
                              }
                            />
                            {/* City */}
                            <Label className="mt-4">
                              <IntlMessages id="agency.city" />
                            </Label>
                            <Input
                              type="text"
                              defaultValue={addressUpdateData.ecity}
                              onChange={(event) =>
                                setAddressUpdateData({
                                  ...addressUpdateData,
                                  ecity: event.target.value,
                                })
                              }
                            />
                            {/* Postal Code */}
                            <Label className="mt-4">
                              <IntlMessages id="agency.postal_code" />
                            </Label>
                            <Input
                              type="text"
                              defaultValue={addressUpdateData.epostal_code}
                              onChange={(event) =>
                                setAddressUpdateData({
                                  ...addressUpdateData,
                                  epostal_code: event.target.value,
                                })
                              }
                            />
                            {/* Co */}
                            <Label className="mt-4">
                              <IntlMessages id="agency.co" />
                            </Label>
                            <Input
                              type="text"
                              defaultValue={addressUpdateData.eco}
                              onChange={(event) =>
                                setAddressUpdateData({
                                  ...addressUpdateData,
                                  eco: event.target.value,
                                })
                              }
                            />
                            {/* Country */}
                            <Label className="mt-4">
                              <IntlMessages id="agency.country" />
                            </Label>
                            <Input
                              type="text"
                              defaultValue={addressUpdateData.ecountry}
                              onChange={(event) =>
                                setAddressUpdateData({
                                  ...addressUpdateData,
                                  ecountry: event.target.value,
                                })
                              }
                            />
                          
                          </ModalBody>
            <ModalFooter>
              <Button
                form="my-form"
                color="primary"
                type='submit'
                 onClick={()=>{SubmitAddressUpdateModal()}}
              >
                Submit
              </Button>{' '}
              <Button
                color="secondary"
                ref={modalRightClose}
                onClick={() => setAddressUpdateModal(false)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

                    </>
                  )}
                  {data.Address === null && (
                      <>
                        <Button
                          outline
                          size="md"
                          color="primary"
                          onClick={() => setAddressModal(true)}
                        >
                          Add Address
                        </Button>
                        <Modal
                          isOpen={addressModal}
                          toggle={() => setAddressModal(!addressModal)}
                          wrapClassName="modal-right"
                        >
                          <ModalHeader>Add Address</ModalHeader>
                          <ModalBody>
                            <Label className="mt-4">
                              <IntlMessages id="agency.street_number" />
                            </Label>
                            <Input
                              type="text"
                              required
                              defaultValue={addressData.street_number}
                              onChange={(event) =>
                                setAddressData({
                                  ...addressData,
                                  street_number: event.target.value,
                                })
                              }
                            />
                            {/* House Number */}
                            <Label className="mt-4">
                              <IntlMessages id="agency.house_number" />
                            </Label>
                            <Input
                              type="text"
                              required
                              defaultValue={addressData.house_number}
                              onChange={(event) =>
                                setAddressData({
                                  ...addressData,
                                  house_number: event.target.value,
                                })
                              }
                            />
                            {/* City */}
                            <Label className="mt-4">
                              <IntlMessages id="agency.city" />
                            </Label>
                            <Input
                              type="text"
                              required
                              defaultValue={addressData.city}
                              onChange={(event) =>
                                setAddressData({
                                  ...addressData,
                                  city: event.target.value,
                                })
                              }
                            />
                            {/* Postal Code */}
                            <Label className="mt-4">
                              <IntlMessages id="agency.postal_code" />
                            </Label>
                            <Input
                              type="text"
                              required
                              defaultValue={addressData.postal_code}
                              onChange={(event) =>
                                setAddressData({
                                  ...addressData,
                                  postal_code: event.target.value,
                                })
                              }
                            />
                            {/* Co */}
                            <Label className="mt-4">
                              <IntlMessages id="agency.co" />
                            </Label>
                            <Input
                              type="text"
                              required
                              defaultValue={addressData.co}
                              onChange={(event) =>
                                setAddressData({
                                  ...addressData,
                                  co: event.target.value,
                                })
                              }
                            />
                            {/* Country */}
                            <Label className="mt-4">
                              <IntlMessages id="agency.country" />
                            </Label>
                            <Input
                              type="text"
                              required
                              defaultValue={addressData.country}
                              onChange={(event) =>
                                setAddressData({
                                  ...addressData,
                                  country: event.target.value,
                                })
                              }
                            />
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              form="my-form"
                              color="primary"
                              type="submit"
                              onClick={handleAddressSubmit}
                            >
                              Submit
                            </Button>{' '}
                            <Button
                              color="secondary"
                              ref={addressModalClose}
                              onClick={() => setAddressModal(false)}
                            >
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </>
                    )}
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ todoApp }) => {
  const { roles } = todoApp;

  return {
    roles,
  };
};
export default connect(mapStateToProps)(UserCardExamples);
