let React = require("react")
let ReactDOM = require("react-dom")

let Clip = React.createClass({displayName: "Clip",
  render: function () {
    if (typeof this.props.clip === "object") {
      return(
        React.createElement("li", null, 
          React.createElement("pre", null, 
            React.createElement("img", {src: this.props.clip.toDataURL()})
          )
        )
      )
    }
    else {
      return(
        React.createElement("li", null, 
          React.createElement("pre", null, this.props.clip)
        )
      )
    }
  }
})

let ClipmanController = React.createClass({displayName: "ClipmanController",
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
      clipsLiElements.push(React.createElement(Clip, {key: i, clip: clips[i]}))
    }
    return(
      React.createElement("ul", {id: "clip-history-ist"}, 
        clipsLiElements
      )
    )
  }
})

ReactDOM.render(
  React.createElement(ClipmanController, {clipmanInterface: require("../../src/scripts/clipmanInterface.js")}),
  document.getElementById("clip-history-container")
)