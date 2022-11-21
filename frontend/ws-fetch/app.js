const URI = 'http://127.0.0.1:5000/api/users';


async function get_users() {
    const response = await fetch(URI, {method: 'GET'});
    const data = await response.json();
    return data;
}


async function get_user(id) {
    const response = await fetch(`${URI}/${id}`, {method: 'GET'});
    const data = await response.json();
    return data;
}


async function post_user(name, admin) {
    const response = await fetch(URI, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'name': name, 'admin': admin})
    });
    const data = await response.json();
    return data;
}


async function put_user(id, name, admin) {
    const response = await fetch(`${URI}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'name': name, 'admin': admin})
    });
    const data = await response.json();
    return data;
}


async function patch_user(id, name=null, admin=null) {
    const response = await fetch(`${URI}/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(name != null ? {'name': name} : {'admin': admin})
    });
    const data = await response.json();
    return data;
}


async function delete_user(id) {
    const response = await fetch(`${URI}/${id}`, {method: 'DELETE'});
    const data = await response.json();
    return data;
}


get_users().then(data => console.log(data));
// get_user(1).then(data => console.log(data));
// post_user('wever', true).then(data => console.log(data));
// post_user('jaques', false).then(data => console.log(data));
// put_user(2, 'paula', true).then(data => console.log(data));
// patch_user(2, name='karol').then(data => console.log(data));
// patch_user(2, null, admin=false).then(data => console.log(data));
// delete_user(2).then(data => console.log(data));
