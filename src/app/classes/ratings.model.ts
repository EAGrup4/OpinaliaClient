import {User} from './user.model';

export class Ratings {
  constructor(
    public userId: User,
    public comment: string,
    public mark: number,
    public date: { type: Date },
  ) {}
}
