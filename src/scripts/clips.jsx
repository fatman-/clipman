// clips.jsx
let React = require("react")
let ReactDOM = require("react-dom")

let Clip = React.createClass({
  render: function () {
    if (typeof this.props.clip === "object") {
      return(
        <li>
          <pre>
            <img src={this.props.clip.toDataURL()}/>
          </pre>
        </li>
      )
    }
    else {
      return(
        <li>
          <pre>{this.props.clip}</pre>
        </li>
      )
    }
  }
})

let ClipmanController = React.createClass({
  getInitialState : function () {
    return {clips: this.props.clipmanInterface.getClipboardHistory()}
  },

  updateClipboardHistory: function () {
    this.props.clipmanInterface.updateClipboardHistory()
    this.setState({clips: this.props.clipmanInterface.getClipboardHistory()})
  },

  componentDidMount: function() {
    // Check for any changes in the clipboard, every half a second
    this.interval = setInterval(this.updateClipboardHistory, 500);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  render: function () {
    let clips = this.state.clips.slice()
    let clipsLiElements = []
    for (let i = 0; i < clips.length; i++) {
      clipsLiElements.push(<Clip key={i} clip={clips[i]} />)
    }
    return(
      <ul id="clip-history-ist">
        {clipsLiElements}
      </ul>
    )
  }
})

ReactDOM.render(
  <ClipmanController clipmanInterface={require("../../src/scripts/clipmanInterface.js")} />,
  document.getElementById("clip-history-container")
)
