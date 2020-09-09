import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Length, IsNotEmpty, IsString } from 'class-validator';
import { nanoid } from '../utils';

@ObjectType()
@Entity()
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column('varchar', { length: 11, nullable: false, unique: true })
  uid: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { length: 200 })
  title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Column('text')
  content: string;

  @Field()
  @Column('double precision', { default: 0 })
  views: number;

  @Field()
  @Column({ default: false })
  isPublished: boolean;

  @Field()
  @Column({ default: false })
  isEdited: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  addUid() {
    this.uid = nanoid();
  }
}
