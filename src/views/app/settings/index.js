import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Todo = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './todo')
);
const User = React.lazy(() =>
  import(/* webpackChunkName: "application-User" */ './User')
);
const Interface = React.lazy(() =>
  import(/* webpackChunkName: "application-Interface" */ './Interface')
);
const Tags = React.lazy(() =>
  import(/* webpackChunkName: "application-Interface" */ './Tags')
);
const Tamplates = React.lazy(() =>
  import(/* webpackChunkName: "application-Interface" */ './Tamplates')
);
const Services = React.lazy(() =>
  import(/* webpackChunkName: "application-Interface" */ './Services')
);
const Companyprofile = React.lazy(() =>
  import(/* webpackChunkName: "application-Interface" */ './Companyprofile')
);
const Myprofile = React.lazy(() =>
  import(/* webpackChunkName: "application-Interface" */ './Myprofile')
);



const Settings = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/todo`} />
      <Route
        path={`${match.url}/todo`}
        render={(props) => <Todo {...props} />}
      />
      {/* <Route
        path={`${match.url}/survey/:surveyid`}
        render={(props) => <SurveyDetail {...props} />}
        isExact
/> */}
      <Route
        path={`${match.url}/user`}
        render={(props) => <User {...props} />}
        isExact
      />
      <Route
      exact
        path={`${match.url}/interface`}
        render={(props) => <Interface {...props} />}
      /> 
      <Route
      exact
        path={`${match.url}/tamplates`}
        render={(props) => <Tamplates {...props} />}
      /> 
      <Route
      exact
        path={`${match.url}/tags`}
        render={(props) => <Tags {...props} />}
      /> 
      <Route
      exact
        path={`${match.url}/services`}
        render={(props) => <Services {...props} />}
      /> 
      <Route
      exact
        path={`${match.url}/company-profile`}
        render={(props) => <Companyprofile {...props} />}
      /> 
      <Route
      exact
        path={`${match.url}/my-profile`}
        render={(props) => <Myprofile {...props} />}
      /> 
     
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Settings;
