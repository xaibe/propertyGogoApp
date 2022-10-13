import { Separator, Colxx } from 'components/common/CustomBootstrap';
import React from 'react'
import { Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
// import Breadcrumb from 'reactstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';

import UserCardExamples from 'containers/ui/UserCardExamples';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { getCurrentUser } from 'helpers/Utils';

const Myprofile = ({ match }) => {
  
 
 const user = getCurrentUser();

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
        <UserCardExamples user = {user}/>
      </Row>
  )
}
const mapStateToProps = ({ authUser }) => {

  return {
    authUser
  };
};
export default injectIntl(
  connect(mapStateToProps)(Myprofile)
);