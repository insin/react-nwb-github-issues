import React from 'react'
import Icon from 'react-fa'
import {Link} from 'react-router'

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

      {this.props.children && React.cloneElement(this.props.children, {repo})}
    </div>
  }
})
