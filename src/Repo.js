import React from 'react'
import {Link} from 'react-router'
import Icon from 'react-fa'
import TimeAgo from 'react-timeago'

let fetchRepo = (user, repoName, cb) => {
  window.fetch(`https://api.github.com/repos/${user}/${repoName}`)
    .then(res => res.json())
    .then(repo => {
      window.fetch(`https://api.github.com/repos/${user}/${repo.name}/issues?per_page=10`)
        .then(res => res.json())
        .then(issues => {
          repo.issues = issues
          cb(null, {repo})
        })
    })
  .catch(err => cb(err))
}

export default React.createClass({
  statics: {
    loadProps(params, cb) {
      fetchRepo(params.username, params.repo_name, cb)
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

      <ul className="repo-issues">
        {repo.issues.map(issue =>
        <li>
          <Icon name="bug"/>
          <div className="comments"><Icon name="comment-o"/> {issue.comments}</div>
          <h3><a href="#TODO">{issue.title}</a></h3>
          <p className="details">
            #{issue.number} opened <TimeAgo date={issue.created_at}/> by <a href="#TODO">{issue.user.login}</a>
          </p>
        </li>
        )}
      </ul>
    </div>
  }
})
