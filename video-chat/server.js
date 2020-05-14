const express = require( 'express' )
const app = express()
const http = require( 'http' ).Server( app )
const io = require( 'socket.io' )( http )
const port = process.env.PORT || 3000

app.use( express.static( __dirname + '/public' ) )
let clients = 0

io.on( 'connection', function ( socket ) {
  socket.on( 'NewCient', function () {
    if ( clients < 2 )
    {
      if ( clients === 1 )
        this.emit( 'CreatePeer' )
    }
    else
      this.emit( 'SessionActive' )
    clients++
  } )
  socket.on( 'Offer', SendOffer )
  socket.on( 'Answer', SendAnswer )

  socket.on( 'disconnect', Disconnect )

} )

function Disconnect () {
  if ( clients > 0 )
  {
    clients--
    this.broadcast( "RemoveVideo" )
  }
}

function SendOffer ( offer ) {
  this.broadcast.emit( 'BackOffer', offer )
}

function SendAnswer ( answer ) {
  this.broadcast.emit( 'BackAnswer', answer )
}

http.listen( port )