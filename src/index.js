require('./app.scss')

import React from 'react'
import {render} from 'react-dom'
import AsyncProps from 'async-props'
import {Router, Route} from 'react-router'

render(
  <Router RoutingContext={AsyncProps} renderLoading={() => <div>Loading...</div>}>
    <Route path="/" component={require('./App')}>
      <Route path=":username" component={require('./User')}/>
    </Route>
  </Router>,
  document.querySelector('#app')
)
