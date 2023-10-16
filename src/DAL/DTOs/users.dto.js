export default class UsersDto {
  constructor(user) {
    this.name = user.name;
    this.username = user.username;
    //this.password = user.password;
    this.role = user.role;
    this.fromGithub = user.fromGithub;
    this.carts = [];
  }
}
