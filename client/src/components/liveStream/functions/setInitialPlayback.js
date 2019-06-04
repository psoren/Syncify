const setInitialPlayback = async (isCreator) => {

    //If the user is the creator, set the playback to be their current song
    if (isCreator) {
        let res = await fetch('https://api.spotify.com/v1/me/player', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        });
        if (res.status === 200) {
            let data = await res.json();
            //Play only the currently playing song
            await fetch('https://api.spotify.com/v1/me/player/play', {
                method: 'PUT',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') },
                body: JSON.stringify({
                    uris: [data.item.uri],
                    position_ms: data.progress_ms
                })
            });
        }
    }

    //If the user is not a creator, get the playback state of the room
    //and set the current playback to be that song at that position
    else {
        //1. Get creator playback state
        let currentURL = new URL(window.location.href);
        let creatorPlaybackInfoRes = await fetch('/getCreatorPlayback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roomId: currentURL.searchParams.get('roomId') })
        });
        let creatorPlaybackInfoResJSON = await creatorPlaybackInfoRes.json();

        //2. Set playback to be the same as the creator
        if (creatorPlaybackInfoResJSON) {
            let currentSong = creatorPlaybackInfoResJSON.currentSong;
            let currentPosition = creatorPlaybackInfoResJSON.currentPosition;
            let isPlaying = creatorPlaybackInfoResJSON.isPlaying;

            //3. Set playback to same position as creator
            if (!localStorage.getItem('accessToken')) {
                console.log('could not find access token');
            }

            await fetch('https://api.spotify.com/v1/me/player/play', {
                method: 'PUT',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') },
                body: JSON.stringify({
                    uris: [currentSong],
                    position_ms: currentPosition + 400
                })
            });

            //4. If the creator is paused, pause playback here as well
            if (!isPlaying) {
                let pauseRes = await fetch('https://api.spotify.com/v1/me/player/pause', {
                    method: 'PUT',
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
                });
                if (pauseRes.status !== 204) {
                    console.log('(setInitialPlayback) could not pause playback');
                }
            }
        }
        else {
            console.log('(setInitialPlayback) could not get creatorPlaybackInfo');
        }
    }

    //At this point, the user's playback is set up.
    //We still need to return the album art and playback info to the client
    let currentURL = new URL(window.location.href);
    let playbackInfoRes = await fetch('/getPlaybackInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: currentURL.searchParams.get('roomId') })
    });
    let playbackInfoResJSON = await playbackInfoRes.json();
    return playbackInfoResJSON;
}

export default setInitialPlayback;