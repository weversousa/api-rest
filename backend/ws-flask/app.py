from json import dump, load
from os.path import exists

from flask import Flask, redirect, url_for, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

header = {'Content-Type': 'application/json'}
table = []
error_http = {
    '400': {'message': 'Usuário não existe.'},
    '409': {'message': 'Usuário já existe.'}
}


@app.route('/', methods=['GET'])
def index():
    return redirect(url_for('get_users'))


@app.route('/api/users', methods=['GET'])
def get_users():
    return (table, 200, )


@app.route('/api/users/<int:id>', methods=['GET'])
def get_user(id=None):
    for user in table:
        if user['id'] == id:
            return (user, 200, header)

    return (error_http['400'], 400, header)


@app.route('/api/users', methods=['POST'])
def post_user():
    data = request.get_json()
    name = data.get('name')

    for user in table:
        if user['name'] == name:
            return (error_http['409'], 409, header)

    user = {'id': len(table) + 1, 'name': name, 'admin': data.get('admin')}
    table.append(user)
    return (user, 201, header)


@app.route('/api/users/<int:id>', methods=['PUT'])
def put_user(id=None):
    for user in table:
        if user['id'] == id:
            data = request.get_json()
            name = data.get('name')

            for match in table:
                if match['name'] == name:
                    return (error_http['409'], 409, header)

            user['name'] = name
            user['admin'] = data.get('admin')
            table[id - 1] = user
            return (user, 200, header)

    return (error_http['400'], 400, header)


@app.route('/api/users/<int:id>', methods=['PATCH'])
def patch_user(id=None):
    for user in table:
        if user['id'] == id:
            data = request.get_json()
            name = data.get('name')

            if name:
                for match in table:
                    if match['name'] == name:
                        return (error_http['409'], 409, header)

                user['name'] = name
            else:
                user['admin'] = data.get('admin')

            table[id - 1] = user
            return (user, 200, header)

    return (error_http['400'], 400, header)


@app.route('/api/users/<int:id>', methods=['DELETE'])
def delete_user(id=None):
    for user in table:
        if user['id'] == id:
            table.pop(id -1)
            return (user, 200, header)

    return (error_http['400'], 400, header)


if __name__ == '__main__':
    app.run(debug=True)
