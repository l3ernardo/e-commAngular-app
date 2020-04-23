export class IUserlogin {
  constructor(
    public status: string,
    public email: string,
    public id: string,
    // tslint:disable-next-line: variable-name
    private _token: string,
    //private _tokenExpirationDate: Date
  ) {}

  get token() {
   /*  if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    } */
    return this._token;
  }
}


/* status: "Successfully",
email: fetchedUser.email,
userId: fetchedUser._id,
_token: jwtoken, */
