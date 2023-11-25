import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { useProduct } from "./../../hooks/useProduct";
import { CommentData } from "../../schemas/comments.schema";
import { TCommentRequest } from "../../interfaces/comment.interface";
import { Button } from "@chakra-ui/react";
import { InputValidator } from "../inputs";
import { Box } from '@chakra-ui/react';
import Rating from 'react-rating-stars-component';
import { SetStateAction, useState } from "react";
import { StyledForm } from "./style";


interface IFormComment {
  id: string;
}

export const FormComment = ({ id }: IFormComment) => {
  const { setComment } = useProduct();

  const [rating, setRating] = useState(0);

  const handleRating = (newRating:any) => {
    setRating(newRating);
   
  };

  const { register, handleSubmit } = useForm<TCommentRequest>({
    mode: "onBlur",
    resolver: zodResolver(CommentData),
  });

  const submit: SubmitHandler<TCommentRequest> = async (data) => {
    const newData = {...data,stars:rating}
    setComment(newData, id);

  };

  return (
    <StyledForm 
    onSubmit={handleSubmit(submit)}
    >
      <InputValidator
        id="comment"
        label="Comentário"
        {...register("comment")}
      />
        <Rating
          
          count={5}
          onChange={handleRating}
          size={24}
      /><br/>
      <Button
        backgroundColor={"var(--brand1)"}
        color={"var(--grey8)"}
        minWidth={"15%"}
        border={"1px solid var(--brand1)"}
        transition={"0.5s"}
        _hover={{
          transition: "0.5s",
          filter:'brightness(1.5)'
        }}
        borderRadius={"10px"}
        type="submit"
      >
        Postar
      </Button>
    </StyledForm>
  );
};
