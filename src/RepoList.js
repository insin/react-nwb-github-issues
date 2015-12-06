import React from 'react'

import Icon from 'react-fa'
import TimeAgo from 'react-timeago'

export default React.createClass({
  render() {
    let {user} = this.props
    return <div>
      <ul className="user-repos">
        {user.repos.map(repo =>
        <li key={repo.name}>
          <ul className="repo-info">
            {repo.language && <li>{repo.language}</li>}
            <li><Icon name="star"/> {repo.stargazers_count}</li>
            <li><Icon name="code-fork"/> {repo.forks_count}</li>
            <li><Icon name="bug"/> {repo.open_issues_count}</li>
          </ul>
          <h3><a href="#TODO">{repo.name}</a></h3>
          {repo.description &&
            <p className="description">The source for {repo.description}</p>
          }
          <p className="updated">Updated <TimeAgo date={repo.pushed_at}/></p>
        </li>
        )}
      </ul>
    </div>
  }
})
