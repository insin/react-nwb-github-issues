function get(url) {
  return window.fetch(`https://api.github.com/${url}`).then(res => res.json())
}

export function fetchUser({username}, cb) {
  Promise.all([
    get(`users/${username}`),
    get(`users/${username}/repos?sort=pushed&direction=desc&per_page=100`)
  ]).then(([user, repos]) => {
    user.repos = repos
    cb(null, {user})
  }).catch(err => cb(err))
}

export function fetchRepo({username, repo_name}, cb) {
  Promise.all([
    get(`repos/${username}/${repo_name}`),
    get(`repos/${username}/${repo_name}/issues?per_page=10`)
  ]).then(([repo, issues]) => {
    repo.issues = issues
    cb(null, {repo})
  }).catch(err => cb(err))
}

export function fetchIssue({username, repo_name, issue_number}, cb) {
  Promise.all([
    get(`repos/${username}/${repo_name}/issues/${issue_number}`),
    get(`repos/${username}/${repo_name}/issues/${issue_number}/comments`)
  ]).then(([issue, comments]) => {
    issue.comments = comments
    cb(null, {issue})
  }).catch(err => cb(err))
}
