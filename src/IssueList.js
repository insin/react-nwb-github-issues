import React from 'react'
import {Link} from 'react-router'

import Icon from 'react-fa'
import TimeAgo from 'react-timeago'

export default React.createClass({
  render() {
    let {repo} = this.props
    return <ul className="repo-issues">
      {repo.issues.map(issue =>
      <li>
        <Icon name="bug"/>
        <div className="comments"><Icon name="comment-o"/> {issue.comments}</div>
        <h3><Link to={`/${repo.owner.login}/${repo.name}/${issue.number}`}>{issue.title}</Link></h3>
        <p className="details">
          #{issue.number} opened <TimeAgo date={issue.created_at}/> by <Link to={`/${issue.user.login}`}>{issue.user.login}</Link>
        </p>
      </li>
      )}
    </ul>
  }
})
