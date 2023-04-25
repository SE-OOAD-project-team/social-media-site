import { server_uri, server_v2_uri } from '../index.js';

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
    // const uri = join_path(server_uri, '/api/login');
    const uri = join_path(server_v2_uri, `api/v2/login`);
    // console.log(uri);
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

    // console.log(res_json);

    if (res_json.status === 'Success') {
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('token', res_json.token);
    } else {
        throw new Error(res_json.reason);
    }
};

const signup = async (username, password) => {
    // const uri = join_path(server_uri, '/api/signup');
    const uri = join_path(server_v2_uri, `api/v2/signup`);
    // console.log(uri);
    const res = await fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });

    const res_json = await res.json();

    console.log(res_json);

    if (res_json.status === 'Success') {
        await login(username, password);
    } else {
        throw new Error(res_json.reason);
    }
};

const edit_password = async (password) => {
    const uri = join_path(server_uri, '/api/edit_password');
    console.log(uri);
    const res = await fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            password,
        }),
    });

    const res_json = await res.json();

    console.log(res_json);

    if (res_json.status !== 'Success') {
        throw new Error(res_json.reason);
    }
};

const logout = () => {
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('token');
};

const get_profile = async (username) => {
    const uri = join_path(
        server_v2_uri,
        '/api/v2/profile',
        username
    );
    console.log(uri);
    const res = await fetch(uri, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const res_json = await res.json();

    console.log(res_json);

    if (res.status === 200) {
        return res_json;
    } else {
        throw new Error(res);
    }
};

const edit_profile = async (newProfile) => {
    const uri = join_path(server_v2_uri, '/api/v2/profile');
    console.log(uri);
    const res = await fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({...newProfile, username: localStorage.getItem('username')}),
    });

    const res_json = await res.json();

    if (res.status !== 200) {
        throw new Error(res);
    }
};

const edit_profile_picture = async (picture) => {
    const uri = join_path(
        server_uri,
        '/api/profile_picture'
    );
    console.log(uri);

    const formData = new FormData();
    formData.append('profile_picture', picture);
    const res = await fetch(uri, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
    });

    const res_json = await res.json();

    console.log(res_json);

    if (res_json.status !== 'Success') {
        throw new Error(res_json.reason);
    }
};

const follow_user = async(username) => {
    const uri = join_path(server_uri, '/api/follow');
    console.log(uri);
    const res = await fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({username}),
    });

    const res_json = await res.json();

    if (res_json.status !== 'Success') {
        throw new Error(res_json.reason);
    }
}

const unfollow_user = async(username) => {
    const uri = join_path(server_uri, '/api/unfollow');
    console.log(uri);
    const res = await fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({username}),
    });

    const res_json = await res.json();

    if (res_json.status !== 'Success') {
        throw new Error(res_json.reason);
    }
}

export {
    join_path,
    login,
    logout,
    signup,
    edit_password,
    get_profile,
    edit_profile,
    edit_profile_picture,
    follow_user,
    unfollow_user
};
