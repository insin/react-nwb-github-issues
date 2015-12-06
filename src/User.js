import React from 'react'
import Icon from 'react-fa'

import {fetchUser} from './api'

export default React.createClass({
  statics: {
    loadProps(params, cb) {
      fetchUser(params, cb)
    }
  },
  render() {
    let {user} = this.props
    return <div>
      <div className="user-header">
        <img className="avatar" height="120" src={`${user.avatar_url}&s=240`} width="120"/>
        <h1>{user.name}</h1>
        <ul className="user-details">
          {user.company &&
            <li>
              <Icon name="briefcase"/>
              {user.company}
            </li>
          }

          {user.location &&
            <li>
              <Icon name="globe"/>
              {user.location}
            </li>
          }

          {user.blog &&
            <li>
              <Icon name="link"/>
              <a href={user.blog} target="_blank">{user.blog}</a>
            </li>
          }
        </ul>
        <ul className="user-tabs">
          <li className="active"><Icon name="book"/> Repositories <span className="badge">{user.public_repos}</span></li>
        </ul>
      </div>

      {this.props.children && React.cloneElement(this.props.children, {user})}
    </div>
  }
})
