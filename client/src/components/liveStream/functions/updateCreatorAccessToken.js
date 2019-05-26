const updateCreatorAccessToken = async () => {
	let currentURL = new URL(window.location.href);
    await fetch('/updateCreatorAccessToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({

            roomId: currentURL.searchParams.get('roomId')
        })
    });   
}

export default updateCreatorAccessToken;