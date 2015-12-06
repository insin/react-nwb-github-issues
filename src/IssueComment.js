import React from 'react'
import {Link} from 'react-router'
import TimeAgo from 'react-timeago'

export default React.createClass({
  render() {
    let {comment} = this.props
    return <div>
      <Link to={`/${comment.user.login}`}>
        <img className="avatar" height="48" width="48" src={`${comment.user.avatar_url}&s=96`}/>
      </Link>
      <div className="comment">
        <p className="comment-header">
          <span className="user">
            <Link to={`/${comment.user.login}`}>{comment.user.login}</Link>
          </span> commented <TimeAgo date={comment.created_at}/>
        </p>
        <div className="comment-body">
          {comment.body}
        </div>
      </div>
    </div>
  }
})
