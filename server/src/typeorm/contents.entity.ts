import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contents {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    nullable: false,
    default: 1,
  })
  user_id: number;

  @Column({
    nullable: false,
    default: 1,
  })
  challenge: number;

  @Column({
    nullable: false,
    default: '',
  })
  image_url: string;

  @Column({
    nullable: false,
    default: 0,
  })
  likes: number;
}
