//Get the room from the server
const getRoom = async () => {
    //Get creator ID
    let currentURL = new URL(window.location.href);
    let creatorIdRes = await fetch('/getCreatorId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            roomId: currentURL.searchParams.get('roomId')
        })
    });
    let creatorIdResJSON = await creatorIdRes.json();
    return creatorIdResJSON;
}

export default getRoom;