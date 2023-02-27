import { Column, Entity } from 'typeorm';

@Entity()
export class Likes {
  @Column({
    nullable: false,
    default: 0,
  })
  likes: number;
}
