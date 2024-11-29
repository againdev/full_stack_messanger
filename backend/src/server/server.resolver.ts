import { Injectable, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { Request } from 'express';
import { GraphqlAuthGuard } from 'src/auth/auth.guard';
import { CreateServerDto } from './dto';
import { ServerService } from './server.service';
import { Server } from './types';
import { GraphQLUpload, FileUpload } from 'graphql-upload-ts';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

@Injectable()
@UseGuards(GraphqlAuthGuard)
@Resolver()
export class ServerResolver {
  constructor(private readonly serverService: ServerService) {}

  @Query(() => [Server])
  async getServers(@Args('email') email: string) {
    if (!email)
      return new ApolloError('Profile not found', 'PROFILE_NOT_FOUND');
    return this.serverService.getServersByProfileEmailOfMember(email);
  }

  @Mutation(() => Server)
  async createServer(
    @Args('input') input: CreateServerDto,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: FileUpload,
  ) {
    if(!file) throw new ApolloError('Image is required', 'IMAGE_REQUIRED');
    const imageUrl = await this.storeImageAndGetUrl(file);

    return this.serverService.createServer(input, imageUrl);
  }

  private async storeImageAndGetUrl(file: FileUpload) {
    const { createReadStream, filename } = await file;
    const uniqueFileName = `${uuidv4()}_${filename}`;
    const imagePath = join(process.cwd(), 'public', 'images', uniqueFileName);
    const imageUrl = `${process.env.APP_URL}/images/${uniqueFileName}`;

    if (!existsSync(join(process.cwd(), 'public', 'images'))) {
      mkdirSync(join(process.cwd(), 'public', 'images'), { recursive: true });
    }

    const readStream = createReadStream();
    readStream.pipe(createWriteStream(imagePath));
    return imageUrl;
  }
}
