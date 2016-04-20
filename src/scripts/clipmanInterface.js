"use strict"

const electron = require("electron")
const clipboard = electron.clipboard
const _ = require("underscore")

let clipmanInterface = function() {
  // A "clip" is either a "nativeImage" object, or plain text.
  let latestClip = (!clipboard.readImage().isEmpty() && clipboard.readImage()) || clipboard.readText()
  let clipboardHistory = []
  let clipboardHistoryLength = 10 // Default

  return {
    setClipHistoryLength: function (num) {
      clipboardHistoryLength = num
    },

    getClipboardHistory: function () {
      return clipboardHistory.slice()
    },

    removeClip: function (clipIndex) {
      clipboardHistory.splice(clipIndex, 1)
    },

    addClip: function (clip) {
      // If the clip is already present in clipboardHistory,
      // remove the clip at the index it is present...
      // TODO: This check doesn't work for images now, them being objects and all...
      let clipIndex = clipboardHistory.indexOf(clip)
      if (clipIndex !== -1) {
        this.removeClip(clipIndex)
      }
      // If the length of clipboardHistory exceeds or equals clipboardHistoryLength,
      // remove the oldest clip...
      if (!(clipboardHistory.length < clipboardHistoryLength)) {
        this.removeClip(0)
      }
      // Finally, add the clip
      clipboardHistory.push(clip)
    },

    updateClipboardHistory: function () {
      let currentClip = (!clipboard.readImage().isEmpty() && clipboard.readImage()) || clipboard.readText()
      if (!(_.isEqual(latestClip, currentClip))) {
        latestClip = currentClip
        this.addClip(latestClip)
      }
    }
  }
}()

module.exports = clipmanInterface
