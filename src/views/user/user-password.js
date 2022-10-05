import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink,useParams , useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { NotificationManager } from 'components/common/react-notifications';
import axios from 'axios';
 

const validateNewPassword = (values) => {
  const { newPassword, newPasswordAgain } = values;
  const errors = {};
  if (newPasswordAgain && newPassword !== newPasswordAgain) {
    errors.newPasswordAgain = 'Please check your password';
  }
  return errors;
};


const UserPassword = ({
  // history,
  loading,
  error,
 
}) => {
  const [newPassword] = useState('');
  const [newPasswordAgain] = useState('');
  
  
  const { hash,email } = useParams();
  console.log("params",hash);
  console.log("params",email);
  // return <div style={{ fontSize: "50px" }}>
  //          Now showing post {hash}
  //        </div>;
  
  
  useEffect(() => {
    
    if (error) {
      NotificationManager.warning(
        error,
        'Setting Up Password Error',
        3000,
        null,
        null,
        ''
        );
      } else if (!loading && newPassword === 'success')
      NotificationManager.success(
        'Please login with your new password.',
        'Setting up Password Success',
        3000,
        null,
        null,
        ''
        );
      }, [error, loading, newPassword]);
      
      
      const initialValues = { newPassword, newPasswordAgain };
      const history = useHistory();
      
      const onSetPassword = async (values) => {
        console.log("values",values)
        if(values.newPassword !== ''){

    const res  = await axios.post(`https://app-propertymanagement.herokuapp.com/auth/verify-create-password-email-link/${hash}/${email}`, values)
  console.log(res)
  if(res) {
    history.push('/user/login')
  }
  }
    
    }
  


  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please enter your password for further Magical Journey. <br />
              If you are not a member, please{' '}
              <NavLink to="/register" className="white">
                
                register
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.set-password" />
            </CardTitle>

            <Formik
              validate={validateNewPassword}
              initialValues={initialValues}
              onSubmit={onSetPassword}
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.new-password" />
                    </Label>
                    <Field
                      className="form-control"
                      name="newPassword"
                      type="password"
                    />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.new-password-again" />
                    </Label>
                    <Field
                      className="form-control"
                      name="newPasswordAgain"
                      type="password"
                    />
                    {errors.newPasswordAgain && touched.newPasswordAgain && (
                      <div className="invalid-feedback d-block">
                        {errors.newPasswordAgain}
                      </div>
                    )}
                  </FormGroup>

                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/login">
                      <IntlMessages id="user.login-title" />
                    </NavLink>
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.set-password-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};



export default UserPassword
