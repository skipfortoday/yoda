import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './Components/Router/ProtectedRoute'
import LoginPage from './Pages/Auth/Login';
import ForgotPasswordPage from './Pages/Auth/ForgotPassword';
import RegisterPage from './Pages/Auth/Register';
import Page404 from './Pages/Helper/404';
import auth from './Helper/auth';
import DashboardPage from './Pages/Content/Dashboard/Dashboard';
import UserManagementPage from './Pages/Content/UserManagement/UserManagement';
import ContentManagementPage from './Pages/Content/ContentManagement/ContentManagement';
import PreformanceReportPage from './Pages/Content/PerformanceReport/PreformanceReport';
import AuditTrailPage from './Pages/Content/AuditTrail/AuditTrail';
import CobaPage from './Pages/Helper/Coba';
import ResetPage from './Pages/Auth/ResetPassword';

export default function Routing(props) {
  return (
    <Switch>
      <Route path="/coba" exact component={CobaPage} />
      <Route path="/" exact component={() => {
        if (auth.isAuthenticated())
          return <Redirect to={{
            pathname: '/dashboard',
            state: {
              from: props.location
            }
          }}/>
        else 
          return <Redirect to={{
            pathname: '/login',
            state: {
              from: props.location
            }
          }}/>
      }} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/forgotPassword" exact component={ForgotPasswordPage} />
      <Route path="/register" exact component={RegisterPage} />
      <Route path="/reset" exact component={ResetPage} />
      
      <ProtectedRoute path="/dashboard" exact component={DashboardPage} />
      <ProtectedRoute path="/manage-user" exact component={UserManagementPage} />
      <ProtectedRoute path="/manage-content" exact component={ContentManagementPage} />
      <ProtectedRoute path="/performance-report" exact component={PreformanceReportPage} />
      <ProtectedRoute path="/audit-trail" exact component={AuditTrailPage} />

      <Route path="*" component={Page404} />
    </Switch>
  )
}
