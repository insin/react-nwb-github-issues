import React from 'react'
import Icon from 'react-fa'

export default React.createClass({
  render() {
    return <div>
      <header>
        <a href="https://github.com/insin/nwb" target="_blank">
          <Icon name="github"/>
        </a>

        <a href="https://github.com/insin/react-nwb-github-issues" target="_blank" className="btn primary fork">
          <Icon name="code-fork"/> Fork Me on GitHub
        </a>
      </header>

      {this.props.children}
    </div>
  }
})
