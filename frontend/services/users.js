import http from '../http-common';

class UserDataServices {
  verifyUser(user = null) {
    if (!user) return { error: '401 Bad Request' };
    return http.post(`/users`, user);
  }

  find(query, by = 'username', password = 'password') {
    return http.get(`/users?${by}=${query}&page=${page}`);
  }

  createUser(user, secret = 'noSecret', admin = false) {
    if (admin) {
      user.admin = admin;
      user.secret = secret;
    }
    return http.post('/newUser', user);
  }

  updateUser(data) {
    return http.put('/user-edit', data);
  }

  deleteUser(id, userId) {
    return http.delete(`/user-delete?id=${id}`, {
      data: { user_id: userId },
    });
  }
}

export default new UserDataServices();
