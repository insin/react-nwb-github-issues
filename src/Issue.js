import React from 'react'
import {Link} from 'react-router'
import TimeAgo from 'react-timeago'

import IssueComment from './IssueComment'

let fetchIssue = ({username, repo_name, issue_number}, cb) => {
  window.fetch(`https://api.github.com/repos/${username}/${repo_name}/issues/${issue_number}`)
    .then(res => res.json())
    .then(issue => {
      window.fetch(`https://api.github.com/repos/${username}/${repo_name}/issues/${issue_number}/comments`)
        .then(res => res.json())
        .then(comments => {
          issue.comments = comments
          cb(null, {issue})
        })
    })
  .catch(err => cb(err))
}

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
          <IssueComment comment={comment}/>
        )}
      </div>
    </div>
  }
})
