export class AuthModel {
  authToken: string;
  refreshToken: string;
  expiresIn: Date;
  jwt: string;
  roles: any

  setAuth(auth: AuthModel) {
    this.authToken = auth.authToken;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
    this.jwt = auth.jwt;
    this.roles = auth.roles
  }
}
