const updateTokens = async () => {
    let res = await fetch('/updateTokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
        })
    });

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        let resJSON = await res.json();
        if (resJSON.success) { 
            localStorage.setItem('accessToken', resJSON.accessToken); 
            console.log(localStorage.getItem('accessToken'));
        }
        else { console.log('(updateTokens) Error when updating access token'); }
    }
}

export default updateTokens;