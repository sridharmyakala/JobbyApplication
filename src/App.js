import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobDetailView from './components/JobDetailView'
import ProtectedRouter from './components/ProtectedRouter'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRouter exact path="/" component={Home} />
    <ProtectedRouter exact path="/jobs" component={Jobs} />
    <ProtectedRouter exact path="/jobs/:id" component={JobDetailView} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
