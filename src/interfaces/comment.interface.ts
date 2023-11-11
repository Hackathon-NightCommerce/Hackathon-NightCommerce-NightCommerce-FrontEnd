import { z } from "zod";
import {
  AllCommentsSchema,
  CommentSchemaRequest,
  CommentsSchema,
} from "../schemas/comments.schema";

export type TCommentRequest = z.infer<typeof CommentSchemaRequest>;

export type TCommentResponse = z.infer<typeof CommentsSchema>;

export type TAllCommentsResponse = z.infer<typeof AllCommentsSchema>;
