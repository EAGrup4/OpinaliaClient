import {User} from './user.model';

export class Ratings {
  constructor(
    public userId: string,
    public title: string,
    public comment: string,
    public rate: number,
    public date: string,
  ) {}
}
