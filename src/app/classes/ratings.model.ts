import {User} from './user.model';

export class Ratings {
  constructor(
    public userId: string,
    public title: string,
    public comment: string,
    public rate: number,
    public date: string,
    public numLike: number,
    public numDislike: number,
    public numReport: number,
    public reports: string[],
    public likes: string,
    public dislikes: string,
    public _id: string,
    public liked: boolean,
    public disliked: boolean
  ) {}
}
