import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { TUpdateAdvert, updateAdvertSchema } from "../../schemas/advert.schema"
import { InputValidator, SelectValidator } from "../inputs"
import { useProduct, useUser } from "../../hooks/useProduct"
import { ReactNode, useEffect, useState } from "react"
import { Button, ButtonGroup, Checkbox } from "@chakra-ui/react"
import { StyledInputsContainer } from "./style"

interface IFormCreateAdvertProps {
  id: number
  onClose: () => void
  children: ReactNode
}

export const FormEditAdvert = ({
  id,
  onClose,
  children,
}: IFormCreateAdvertProps) => {
  const [imageInputCount, setImageInputCount] = useState(0)

  const {
    updateAdvert,

  } = useProduct()

  const { announceListUser } = useUser()

  const advert = announceListUser?.adverts.find((e) => e.id == id)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateAdvert>({
    mode: "onBlur",
    resolver: zodResolver(updateAdvertSchema),
    defaultValues: {
      name:advert?.name,
      brand: advert?.brand,
      price: advert?.price,
      qtd:advert?.qtd,
      category:advert?.category,
      description: advert?.description,
      information_additional:advert?.information_additional,
      promotion:advert?.promotion,
      published:advert?.published,
      cover_image: advert?.cover_image,
      // images: advert!.images.map((img) => img.image),
    },
  })

  const renderImageInput = () => {
    const result = []
    for (let i = 0; i < imageInputCount; i++) {
      result.push(
        <InputValidator
          id={`image${i}`}
          key={`image${i}`}
          label={`${i + 1}ª da galeria`}
          placeholder="Insira a imagem de capa aqui"
          error={errors.cover_image?.message}
          {...register(`images.${i}`, { required: "Informe a imagem" })}
        />
      )
    }
    return result
  }

  const addImageInput = () => {
    setImageInputCount(imageInputCount + 1)
  }

  const submit: SubmitHandler<TUpdateAdvert> = async (data) => {
    // const imageData = []

    // for (let i = 0; i < data.images.length; i++) {
    //   imageData.push({
    //     id: advert?.images[i] ? advert?.images[i].id : i,
    //     image: data.images[i],
    //   })
    // }

    const fullData = {
      ...data,
      // images: imageData,
      price: Number(data.price),
      qtd:Number(data.qtd)
    }

    const close = await updateAdvert(id, fullData)
    if (close) {
      onClose()
    }
  }

  useEffect(() => {
   
    // setImageInputCount(advert!.images.length)

  }, []);


  return (
    <form onSubmit={handleSubmit(submit)}>
    <InputValidator
      id="name"
      placeholder="Nome do produto"
      label="Nome"
      error={errors.name?.message}
      {...register("name")}
    />
    
    <InputValidator
      id="brand"
      placeholder="Marca do produto"
      label="Marca"
      error={errors.brand?.message}
      {...register("brand")}
    />
    <StyledInputsContainer>

      <InputValidator
        id="price"
        label="Preço"
        placeholder="Insira o Preço"
        error={errors.price?.message}
        type="number"
        {...register("price")}
      />
      <InputValidator
        id="qtd"
        label="Quantidade"
        placeholder="Quantidade do produto"
        error={errors.qtd?.message}
        type="number"
        {...register("qtd")}
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
      {...register("description")}
    />
    <InputValidator
      type="text"
      id="information"
      label="Informação Adcional"
      placeholder="Informações extras do produto"
      error={errors.information_additional?.message}
      {...register("information_additional")}
    />
    <InputValidator
      type="text"
      id="category"
      label="Categoria do produto"
      placeholder="Categoria do produto"
      error={errors.category?.message}
      {...register("category")}
    />

    <InputValidator
      id="cover_image"
      label="Imagem de capa"
      placeholder="Insira a imagem de capa aqui"
      error={errors.cover_image?.message}
      {...register("cover_image")}
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
  )
}
