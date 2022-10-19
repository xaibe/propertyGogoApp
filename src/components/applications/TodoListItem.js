import React, { useEffect, useState } from 'react';
import { Card, CardBody, Badge, CustomInput, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './todoStyles.css';
import { getAllUsers, deleteAllUsers } from 'api';
import { Colxx } from '../common/CustomBootstrap';

const TodoListItem = ({ item, handleCheckChange, isSelected }) => {
  const [allUsers, setAllusers] = useState();
  useEffect(() => {
    getAllUsers().then((res) => {
      console.log('RESPONSE OF ALL USERS IS ', res);
      setAllusers(res.data.data);
    });
  }, [allUsers]);
  return (
    <Colxx xxs="12">
      {console.log('TODOLIST ', item)}
      <Card className="card d-flex mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <NavLink
              to="#"
              location={{}}
              id={`toggler${item.id}`}
              className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
            >
              {/* <i
                className={`${
                  item.status === 'COMPLETED'
                    ? 'simple-icon-check heading-icon'
                    : 'simple-icon-refresh heading-icon'
                }`}
              /> */}
              <span className="align-middle d-inline-block">
                {item.firstName} {item.lastName}
              </span>
              <p className="mx-4 text-muted text-small d-inline-block w-15 w-xs-100">
                {item.email}
              </p>
            </NavLink>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {item.roles}
            </p>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {item.createDate}
            </p>
            <div className="w-15 w-xs-100">
              <Badge color={item.labelColor} pill>
                {item.status}
              </Badge>
            </div>
          </CardBody>
          {/* <div className="custom-control flex-row custom-checkbox pl-1 align-self-center mr-4"> */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: '10px',
            }}
          >
            <Button
              className="delete-button-class"
              onClick={() => {
                deleteAllUsers(item.id).then(()=>{
                  window.location.reload(false);

                })
              }}
            >
              Delete
            </Button>
            <Button className="edit-button-class">Edit</Button>
            <CustomInput
              className="itemCheck mb-0"
              type="checkbox"
              id={`check_${item.id}`}
              checked={isSelected}
              onChange={(event) => handleCheckChange(event, item)}
              label=""
            />
          </div>

          {/* </div> */}
        </div>

        <div className="card-body pt-1">
          <p className="mb-0">{item.description}</p>
        </div>
      </Card>
    </Colxx>
  );
};

export default React.memo(TodoListItem);
