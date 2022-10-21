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

    return res_json.status === 'Success';
};

export { login };
