function get(url) {
  return window.fetch(`https://api.github.com/${url}`).then(res => res.json())
}

const _CACHE = {}

let cached = (path) => _CACHE[path]

function cache(path, value, seconds = 60) {
  console.info('caching %s for %s seconds %o', path, seconds, value)
  cache[path] = value
  setTimeout(() => {
    console.info('expiring %s', path)
    _CACHE[path] = null
  }, seconds * 1000)
}

function fetchWithCollection(name, path, collectionProp, collectionPath, cb) {
  if (cached(path)) return cb(null, cached(path))
  Promise.all([path, collectionPath].map(get))
  .then(([obj, collection]) => {
    obj[collectionProp] = collection
    cache(path, obj)
    cb(null, {[name]: obj})
  })
  .catch(err => {
    console.error(err)
    cb(err)
  })
}

export function fetchUser({username}, cb) {
  let userPath = `users/${username}`
  fetchWithCollection(
    'user', userPath, 'repos', `${userPath}/repos?sort=pushed&direction=desc&per_page=100`, cb
  )
}

export function fetchRepo({username, repo_name}, cb) {
  let repoPath = `repos/${username}/${repo_name}`
  fetchWithCollection(
    'repo', repoPath, 'issues', `${repoPath}/issues?per_page=10`, cb
  )
}

export function fetchIssue({username, repo_name, issue_number}, cb) {
  let issuePath = `repos/${username}/${repo_name}/issues/${issue_number}`
  fetchWithCollection(
    'issue', issuePath, 'comments', `${issuePath}/comments`, cb
  )
}
