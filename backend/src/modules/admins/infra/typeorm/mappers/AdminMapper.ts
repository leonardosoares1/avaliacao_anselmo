import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('admins')
class AdminMapper {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column('varchar', {
    comment: 'E-mail',
    length: 255,
    name: 'email',
    nullable: false,
  })
  email: string;

  @Column('varchar', {
    name: 'password',
    nullable: false,
    length: 255,
  })
  password: string;

  @Column('bool', {
    name: 'is_active',
    nullable: false,
    default: true,
  })
  isActive: boolean;

  @Column('varchar', {
    length: 255,
    name: 'name',
    nullable: false,
  })
  name: string;

  @CreateDateColumn({
    default: 'NOW()',
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;
}

export default AdminMapper;
