import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
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
    name: 'email',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    name: 'instagram',
    nullable: false,
    default: '',
  })
  instagram: string;

  @Column({
    nullable: false,
    default: '',
  })
  gender: string;

  @Column({
    nullable: false,
    default: false,
  })
  role: string;
}
