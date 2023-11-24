import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { advertSchemaValidator } from "../../schemas/advert.schema";
import { TAdverData } from "../../interfaces/advert.interface";
import { InputValidator, SelectValidator } from "../inputs";
import { useProduct } from "../../hooks/useProduct";
import { ReactNode, useEffect, useState } from "react";
import { Button, ButtonGroup, Checkbox, Input, border } from "@chakra-ui/react";
import { StyledInputsContainer } from "./style";

interface IFormCreateAdvertProps {
  onClose: () => void;
  children: ReactNode;
}

export const FormCreateAdvert = ({
  onClose,
  children,
}: IFormCreateAdvertProps) => {
  const [imageInputCount, setImageInputCount] = useState(2);
  const {
    createAdvert,
  } = useProduct();
  const {register, handleSubmit, formState: { errors },} = useForm<TAdverData>({

    resolver: zodResolver(advertSchemaValidator),
  });

  const renderImageInput = () => {
    const result = [];
    for (let i = 0; i < imageInputCount; i++) {
      result.push(
        <InputValidator
          id={`image${i}`}
          key={`image${i}`}
          label={`${i + 1}ª da galeria`}
          placeholder="Insira a imagem de capa aqui"
          error={errors.images?.message}
          {...register(`images.${i}`)}
        />
      );
    }
    return result;
  };

  const addImageInput = () => {
    setImageInputCount(imageInputCount + 1);
  };

  const submit: SubmitHandler<TAdverData> = async (data) => {
    const fullData = {
      ...data,
      price: Number(data.price),
      qtd:Number(data.qtd)
    };
    console.log(fullData);
    const close = await createAdvert(fullData);
    if (close) {
      onClose();
    }
  };

  console.log(errors)

  return (
    <form onSubmit={handleSubmit(submit)}>
      <InputValidator
        id="name"
        placeholder="Nome do produto"
        label="Nome"
        error={errors.name?.message}
        {...register("name", { required: "Nome do produto" })}
      />
      
      <InputValidator
        id="brand"
        placeholder="Marca do produto"
        label="Marca"
        error={errors.brand?.message}
        {...register("brand", { required: "Informe a marca" })}
      />
      <StyledInputsContainer>

        <InputValidator
          id="price"
          label="Preço"
          placeholder="Insira o Preço"
          error={errors.price?.message}
          type="number"
          {...register("price", { required: "Informe o preço" })}
        />
        <InputValidator
          id="qtd"
          label="Quantidade"
          placeholder="Quantidade do produto"
          error={errors.qtd?.message}
          type="number"
          {...register("qtd", { required: "Informe a quantidade no estoque" })}
        />

        <Checkbox 
        style={{
          padding:'10px',
          border:'1px solid var(--brand1)'
        }}
        id="promotion"
        {...register("promotion", { required: "" })}
        >
          Esse preço e promocional ?
        
        </Checkbox>

        <Checkbox 
        style={{
          padding:'10px',
          border:'1px solid var(--brand1)'
        }}
        id="published"
        defaultChecked={true}
        {...register("published", { required: "" })}
        >
          Deseja deixa publicado?
        
        </Checkbox>
      </StyledInputsContainer>
      <InputValidator
        type="text"
        id="description"
        label="Descrição"
        placeholder="Insira a descrição aqui"
        error={errors.description?.message}
        {...register("description", { required: "Informe a descrição" })}
      />
      <InputValidator
        type="text"
        id="information"
        label="Informação Adcional"
        placeholder="Informações extras do produto"
        error={errors.information_additional?.message}
        {...register("information_additional", { required: "Informação Adcional" })}
      />
      <InputValidator
        type="text"
        id="category"
        label="Categoria do produto"
        placeholder="Categoria do produto"
        error={errors.category?.message}
        {...register("category", { required: "Categoria do produto" })}
      />

      <InputValidator
        id="cover_image"
        label="Imagem de capa"
        placeholder="Insira a imagem de capa aqui"
        error={errors.cover_image?.message}
        {...register("cover_image", { required: "Informe imagem de capa" })}
      />
      {renderImageInput()}
      <Button
        fontSize={"0.75rem"}
        fontWeight={"bold"}
        color={"var(--brand1)"}
        backgroundColor={"var(--brand4)"}
        transition={"0.5s"}
        _hover={{
          filter: "brightness(0.95)",
          transition: "0.5s",
        }}
        marginBottom={"1rem"}
        onClick={addImageInput}
      >
        Adicionar campo para imagem da galeria
      </Button>
      <ButtonGroup width={"100%"} justifyContent={"space-between"}>
        {children}
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
          type="submit"
        >
          Enviar
        </Button>
      </ButtonGroup>
    </form>
  );
};
