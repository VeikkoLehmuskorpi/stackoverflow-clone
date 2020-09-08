import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column()
  @Generated('uuid')
  uuid: string;

  @Field()
  @Column('varchar', { length: 200 })
  title: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column()
  views: number;

  @Field()
  @Column()
  isPublished: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
