import { Separator, Colxx } from 'components/common/CustomBootstrap';
import React from 'react'
import { Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
// import Breadcrumb from 'reactstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';

const Myprofile = ({ match }) => {
  return (
    <Row className="app-row survey-app">
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.my-profile" />
            </h1>
            
            <Breadcrumb  match={match} />
           
            
           
          </div>

         
          <Separator className="mb-5" />

        </Colxx>
      </Row>
  )
}
export default Myprofile