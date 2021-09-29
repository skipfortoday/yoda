class Auth 
{
  constructor() {
    this.token = sessionStorage.getItem('token');
    this.authenticated = this.token === null ? false : true;
    this.user = sessionStorage.getItem('user')!==null?JSON.parse(sessionStorage.getItem('user')):null;
  }

  login(params) {
    this.authenticated = true;
    this.token = params.token;
    sessionStorage.setItem('token', params.token);
    this.user = params.user;
    sessionStorage.setItem('user', JSON.stringify(params.user));
  }

  logout() {
    this.authenticated = false;
    this.token = null;
    sessionStorage.removeItem('token');
    this.user = null;
    sessionStorage.removeItem('user');
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();