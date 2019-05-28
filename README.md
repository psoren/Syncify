# Syncify

Syncify is a MERN stack application that allows users to listen to songs together.  It uses the Spotify Web API on the server side for authentication, and uses the Spotify Web Playback SDK for client-side playback in the browser.


![Live Stream Page](client/public/screenshot1.jpeg)


## Usage of the RoomSelect page

When a user logs in to the site, they are redirected to the room select screen and their most recent song played on Spotify will begin playing.  They are then presented with three options.

1. Create a new room.  This will create a new room object in the database, and continue playback of their currently playing song.  

2. Join a room.  The user can enter a room ID, which will search the database for a room with that room ID.  If the room is found, they will be redirected to the LiveStream screen, and if the room is not found, they will be presented with an error.

3. Join a current room from the Current Rooms list.  The currently playing rooms are presented in a list in the RoomSelect screen.  If the user clicks the join button by any currently playing room, they will be redirected to the live stream page for that room.

## Usage of the LiveStream page

Once the user is in the livestream page, they are in one of two roles.  If they created the room, they are the creator, and if they joined the room, they are a listener.  The only difference between the two is that the creator can play, pause, go to the previous song, and go to the next song.  

The creator and the listeners can add songs to a room. They have three different options for doing this.

1. They can search for a song in the bottom search bar and add the song to the queue.

2. They can search for an artist, and then add that artists top ten songs to the upcoming queue.  (More artist functionality will be coming soon, such as playing specific albums from an artist).

3. The user can search for a playlist either in their library or in Spotify, and then play that playlist.  This will replace all current songs in the queue and start playback of the playlist.

## Song Recommendations

If there are no more songs left in the queue once the last song in the room ends, the application will find a song based on the last five songs played in the room, and start playback of that song for all users in the room.

## Synchronization

All playback of users of the room is synchronized to that of the creator.  Any time the creator toggles playback or changes the current song, the listeners' playback will also be changed.

