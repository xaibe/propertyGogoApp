import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const AgencyApp = React.lazy(() =>
  import(/* webpackChunkName: "AgencyApp" */ './AgencyApp')
);




const Agency = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/agencyapp`} />
      <Route
        path={`${match.url}/agencyapp`}
        render={(props) => <AgencyApp {...props} />}
      />
      {/* <Route
        path={`${match.url}/survey/:surveyid`}
        render={(props) => <SurveyDetail {...props} />}
        isExact
/> */}
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Agency;
