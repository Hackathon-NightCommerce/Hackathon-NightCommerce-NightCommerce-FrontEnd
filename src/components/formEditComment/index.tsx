import { ReactNode, useState } from "react";
import { InputValidator } from "../inputs";
import { Button } from "@chakra-ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentData } from "../../schemas/comments.schema";
import { useProduct, useUser } from "../../hooks/useProduct";
import { useParams } from "react-router";
import Rating from 'react-rating-stars-component';


interface IFormEditCommentProps {
    onClose: () => void;
    children: ReactNode;
    comment:string;
    stars:number;
    idComment:number;
    idAdvert:number;
  }

export const FormEditComment = ({comment,idComment,onClose,idAdvert,stars}:IFormEditCommentProps)=>{

    const { updateComment,deleteComment} = useProduct();
    const [rating, setRating] = useState(0);

    const handleRating = (newRating:any) => {
        setRating(newRating);
       
      };

    const { register, handleSubmit } = useForm({
        mode: "onBlur",
        resolver: zodResolver(CommentData),
      });
    
      const submit = async (data:object) => {
        await updateComment({...data, stars:rating},idComment,idAdvert);
        onClose();
      };

    return(
        <>
            <form onSubmit={handleSubmit(submit)}>
                <InputValidator
                    id="comment"
                    label="Comentário"
                    defaultValue={comment}
                    {...register("comment")}
                />
                    <Rating
                        value={stars}
                        count={5}
                        onChange={handleRating}
                        size={24}
                    /><br/>
               
                <Button
                    backgroundColor={"var(--alert1)"}
                    color={"var(--grey8)"}
                    width={"40%"}
                    border={"1px solid var(--alert1)"}
                    transition={"0.5s"}
                    _hover={{
                    bg: "transparent",
                    color: "var(--alert1)",
                    transition: "0.5s",
                    }}
                    borderRadius={"10px"}
                    onClick={()=>{deleteComment(idComment, idAdvert);  onClose()}}
                >
                    Excluir
                </Button>
                <Button
                    backgroundColor={"var(--brand1)"}
                    color={"var(--grey8)"}
                    width={"40%"}
                    border={"1px solid var(--brand1)"}
                    transition={"0.5s"}
                    _hover={{
                    bg: "transparent",
                    color: "var(--brand1)",
                    transition: "0.5s",
                    }}
                    borderRadius={"10px"}
                    marginLeft={"80px"}
                    type="submit"
                >
                    Atualizar
                </Button>
            </form>
        
        </>
    )

}