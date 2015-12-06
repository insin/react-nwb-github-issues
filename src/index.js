require('./app.scss')

import React from 'react'
import {render} from 'react-dom'
import AsyncProps from 'async-props'
import {Router, Route, IndexRoute} from 'react-router'

render(
  <Router RoutingContext={AsyncProps} renderLoading={() => <div>Loading...</div>}>
    <Route path="/" component={require('./App')}>
      <Route path=":username" component={require('./User')}>
        <IndexRoute component={require('./RepoList')}/>
        <Route path=":repo_name" component={require('./Repo')}/>
      </Route>
    </Route>
  </Router>,
  document.querySelector('#app')
)
