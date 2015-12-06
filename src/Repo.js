import React from 'react'

import Icon from 'react-fa'

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
          <span className="user"><a href="#TODO">{repo.owner.login}</a></span>
          {' / '}
          <span className="repo"><a href="#TODO">{repo.name}</a></span>
        </h1>
      </div>

      <ul className="repo-issues">
        <li>
          <Icon name="bug"/>
          <div className="comments"><Icon name="comment-o"/> 10</div>
          <h3><a href="#TODO">Splat operator</a></h3>
          <p className="details">
            #1050 opened 2015-10-18T05:05:04Z by <a href="#TODO">mixonic</a>
          </p>
        </li>
      </ul>
    </div>
  }
})
