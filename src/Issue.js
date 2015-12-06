import React from 'react'
import {Link} from 'react-router'
import TimeAgo from 'react-timeago'

let fetchIssue = ({username, repo_name, issue_number}, cb) => {
  window.fetch(`https://api.github.com/repos/${username}/${repo_name}/issues/${issue_number}`)
    .then(res => res.json())
    .then(issue => {
      window.fetch(`https://api.github.com/repos/${username}/${repo_name}/issues/${issue_number}/comments`)
        .then(res => res.json())
        .then(comments => {
          issue.comments
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
        <div>
          <Link to={`/${issue.user.login}`}>
            <img className="avatar" height="48" width="48" src={`${issue.user.avatar_url}&s=96`}/>
          </Link>

          <div className="comment">
            <p className="comment-header">
              <span className="user"><Link to={`/${issue.user.login}`}>{issue.user.login}</Link></span>
              commented <TimeAgo date={issue.created_at}/>
            </p>
            <div className="comment-body">
              {issue.body}
            </div>
          </div>
        </div>
      </div>
    </div>
  }
})
