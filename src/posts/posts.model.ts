import { Prisma } from '@prisma/client';


export class Posts implements Prisma.PostsCreateInput{
  title : string;
  content : string;
  author : string;
  viewers : string[];

}

// interface Post {
// id: number;
// title: string;
// content: string;
// author: User;
// viewers: User[];
// }
