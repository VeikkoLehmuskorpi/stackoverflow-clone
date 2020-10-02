import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { generateUid } from '~/utils/generateUid';
import {
  Length,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
} from 'class-validator';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  pk: number;

  @Field()
  @Column('varchar', { length: 11, nullable: false, unique: true })
  id: string;

  @Field()
  @Length(1, 64)
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { length: 64, nullable: false, unique: true })
  username: string;

  @Length(10)
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { nullable: false })
  password: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  @Column('varchar', { nullable: false, unique: true })
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(1)
  @IsString()
  @Column('varchar', { nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(1)
  @IsString()
  @Column('varchar', { nullable: true })
  lastName: string;

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
