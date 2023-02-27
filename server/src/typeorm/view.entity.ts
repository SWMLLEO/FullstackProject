import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class View {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  firstname: string;

  @Column({
    nullable: false,
    default: '',
  })
  lastname: string;

  @Column({
    nullable: false,
    default: '',
  })
  image_url: string;

  @Column({
    nullable: false,
    default: false,
  })
  challenge_name: string;

  @Column({
    nullable: false,
    default: false,
  })
  challenge_tag: string;

  @Column({
    nullable: false,
    default: false,
  })
  likes: string;
}
