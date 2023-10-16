export default class UserRegisterDto {
  constructor(user) {
    this.name = `${user.first_name} ${user.last_name}`;
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
    this.fromGithub = user.fromGithub;
    this.carts = [];
  }
}
