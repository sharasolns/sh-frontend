class ShSocket {
  activeChannel
  constructor (io) {
    this.io = io
  }

  channel (channel) {
    if (this.io) {
      this.io.emit('joinChannel', 'hauzisha.' + channel)
      this.activeChannel = channel
    } else {
      console.log('Socketio server not set')
    }
    return this
  }

  listen (event, callback) {
    if (this.io) {
      this.io.on(event, callback)
    } else {
      console.log('Socketio server not set')
    }
    return this
  }

  leave () {
    if (this.io) {
      this.io.emit('leaveChannel', 'hauzisha.' + this.activeChannel)
    } else {
      console.log('Socketio server not set')
    }
    return true
  }
}

export default ShSocket
