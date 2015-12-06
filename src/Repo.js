import React from 'react'
import Icon from 'react-fa'
import {Link} from 'react-router'

import {fetchRepo} from './api'

export default React.createClass({
  statics: {
    loadProps(params, cb) {
      fetchRepo(params, cb)
    }
  },
  render() {
    let {repo} = this.props
    return <div>
      <div className="repo-header">
        <h1>
          <Icon name="book"/>
          {' '}
          <span className="user"><Link to={`/${repo.owner.login}`}>{repo.owner.login}</Link></span>
          {' / '}
          <span className="repo"><Link to={`/${repo.owner.login}/${repo.name}`}>{repo.name}</Link></span>
        </h1>
      </div>

      {this.props.children && React.cloneElement(this.props.children, {repo})}
    </div>
  }
})
