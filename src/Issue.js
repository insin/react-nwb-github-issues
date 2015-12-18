import React from 'react'
import {Link} from 'react-router'
import TimeAgo from 'react-timeago'

import {fetchIssue} from './api'
import IssueComment from './IssueComment'

export default React.createClass({
  statics: {
    loadProps(params, cb) {
      fetchIssue(params, cb)
    }
  },
  render() {
    let {issue} = this.props
    return <div>
      <div className="issue-header">
        <h2>{issue.title} <span className="number">#{issue.number}</span></h2>
        <p className="details">
          <span className="user"><Link to={`/${issue.user.login}`}>{issue.user.login}</Link></span> opened
          this issue <TimeAgo date={issue.created_at}/>
        </p>
      </div>

      <div className="issue-comments">
        <IssueComment comment={issue}/>
        {issue.comments.map(comment =>
          <IssueComment key={comment.id} comment={comment}/>
        )}
      </div>
    </div>
  }
})
