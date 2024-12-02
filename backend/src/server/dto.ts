import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsString } from 'class-validator';
import { ChannelType } from './types';

@InputType()
export class CreateServerDto {
  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field(() => Int)
  profileId: number;
}

@InputType()
export class UpdateServerDto {
  @IsString()
  @Field()
  name: string;

  @IsInt()
  @Field(() => Int)
  serverId: number;
}

@InputType()
export class CreateChannelOnServerDto {
  @IsString()
  @Field()
  name: string;

  @IsInt()
  @Field(() => Int)
  serverId: number;

  @IsEnum(ChannelType)
  @Field(() => ChannelType)
  type: ChannelType;
}
