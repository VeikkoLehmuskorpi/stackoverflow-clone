import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { generateUid } from '../utils/generateUid';

@ObjectType()
@Entity()
export class Post {
  @PrimaryGeneratedColumn('increment')
  pk: number;

  @Field()
  @Column('varchar', { length: 11, nullable: false, unique: true })
  id: string;

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
    this.id = generateUid();
  }
}
