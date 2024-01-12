async function login(user, password) {
    const url = location.origin + "/api/token";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "username=" + encodeURIComponent(user) + "&password=" + encodeURIComponent(password) + "&grant_type=password"
    });
    const data = await response.json();
    if (response.status == 200) {
        return data.access_token;
    } else {
        throw data.detail;
    }
}

async function register(user, password) {
    const url = location.origin + "/api/user";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: user,
            password: password
        })
    });
    const data = await response.json();
    if (response.status != 200) throw data.detail;
}

