import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('posts')
class PostMapper {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column('varchar', {
    length: 255,
    name: 'title',
    nullable: false,
  })
  title: string;

  @Column('varchar', {
    name: 'subtitle',
    nullable: false,
    length: 255,
  })
  subtitle: string;

  @Column('varchar', {
    name: 'thumbnail',
    nullable: false,
    length: 255,
  })
  thumbnail: string;

  @Column('text', {
    name: 'content',
    nullable: false,
  })
  content: string;

  @Column('int', {
    name: 'count_likes',
    nullable: false,
  })
  countLikes: number;

  @Column('int', {
    name: 'count_shares',
    nullable: false,
  })
  countShares: number;

  @Column('bool', {
    name: 'is_active',
    nullable: false,
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn({
    default: 'NOW()',
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;
}

export default PostMapper;
