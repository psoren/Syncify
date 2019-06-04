//This method is called when the room is joined for the first time
//to see if the user is the creator
const checkIfCreator = async () => {
    //Get creator ID
    let currentURL = new URL(window.location.href);
    let creatorIdRes = await fetch('/getCreatorId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            roomId: currentURL.searchParams.get('roomId')
        })
    });
    try {
        let creatorIdResJSON = await creatorIdRes.json();
        let creatorId = creatorIdResJSON.creatorId;

        //Get current ID
        let currentUserRes = await fetch('https://api.spotify.com/v1/me', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        });
        let currentUserResJSON = await currentUserRes.json();
        let currentUserId = currentUserResJSON.id;

        return currentUserId === creatorId;
    }
    catch (err) {
        console.error(err);
    }
}

export default checkIfCreator;