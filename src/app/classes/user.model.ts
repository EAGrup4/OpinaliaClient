export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public profileImage: string,
    public admin: boolean,
    public _id: string
  ) {}
}
