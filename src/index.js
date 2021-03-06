require('es6-promise').polyfill()
require('whatwg-fetch')

require('./app.scss')

import AsyncProps from 'async-props'
import {createHashHistory} from 'history'
import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute} from 'react-router'
import useScroll from 'scroll-behavior/lib/useStandardScroll'

let history = useScroll(createHashHistory)()

render(
  <Router history={history} RoutingContext={AsyncProps} renderLoading={() => <div>Loading...</div>}>
    <Route path="/" component={require('./App')}>
      <Route path=":username" component={require('./User')}>
        <IndexRoute component={require('./RepoList')}/>
        <Route path=":repo_name" component={require('./Repo')}>
          <IndexRoute component={require('./IssueList')}/>
          <Route path=":issue_number" component={require('./Issue')}/>
        </Route>
      </Route>
    </Route>
  </Router>,
  document.querySelector('#app')
)
