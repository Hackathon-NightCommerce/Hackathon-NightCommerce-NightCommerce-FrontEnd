import { z } from "zod";

const UserSchema = z.object({
  name: z.string(),
});

export const CommentsSchema = z.object({
  id: z.string(),
  comment: z.string(),
  stars:z.number(),
  user: UserSchema,
  advert: z.number(),
  created_at: z.string(),
});

export const CommentSchemaRequest = CommentsSchema.omit({
  id: true,
  advert: true,
  user: true,
  created_at: true,
  
});

export const CommentData = z.object({
  comment: z.string(),
});

export const AllCommentsSchema = z.array(CommentsSchema);
