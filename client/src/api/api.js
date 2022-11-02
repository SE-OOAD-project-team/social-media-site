const join_path = (...args) =>
    args
        .map((part, i) => {
            if (i === 0) {
                return part.trim().replace(/[/]*$/g, '');
            } else {
                return part.trim().replace(/(^[/]*|[/]*$)/g, '');
            }
        })
        .filter((x) => x.length)
        .join('/');

const login = async (username, password) => {
    const uri = join_path(process.env.REACT_APP_API_URI, '/api/login');
    console.log(uri);
    const res = await fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    const res_json = await res.json();

    console.log(res_json);

    if (res_json.status === 'Success') {
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('token', res_json.token);
    } else {
        throw new Error(res_json.reason);
    }
};

const logout = () => {
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('token');
}

export { login, logout };
