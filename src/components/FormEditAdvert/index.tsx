import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { TUpdateAdvert, updateAdvertSchema } from "../../schemas/advert.schema"
import { InputValidator, SelectValidator } from "../inputs"
import { useProduct, useUser } from "../../hooks/useProduct"
import { ReactNode, useEffect, useState } from "react"
import { Button, ButtonGroup } from "@chakra-ui/react"
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
    getKenzieKarsByBrand,
    getKenzieKarsInformation,
    kenzieKarsBrands,
    kenzieKars,
    kenzieKarModel,
    getKenzieKar,
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
      brand: advert?.brand,
      model: advert?.model,
      fuel: advert?.fuel,
      mileage: advert?.mileage,
      color: advert?.color,
      price: advert?.price,
      description: advert?.description,
      cover_image: advert?.cover_image,
      images: advert!.images.map((img) => img.image),
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
          error={errors.images?.message}
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
    const imageData = []

    for (let i = 0; i < data.images.length; i++) {
      imageData.push({
        id: advert?.images[i] ? advert?.images[i].id : i,
        image: data.images[i],
      })
    }

    const fullData = {
      ...data,
      images: imageData,
      table_fipe: kenzieKarModel!.value > data!.price! ? true : false,
      year: Number(kenzieKarModel!.year),
      fuel: String(kenzieKarModel!.fuel),
      mileage: Number(data.mileage),
      price: Number(data.price),
    }

    const close = await updateAdvert(id, fullData)
    if (close) {
      onClose()
    }
  }

  useEffect(() => {
    getKenzieKarsInformation()
    setImageInputCount(advert!.images.length)

    getKenzieKarsByBrand(advert!.brand)
    getKenzieKar(advert!.model)
  }, [])

  return (
    <form onSubmit={handleSubmit(submit)}>
      <SelectValidator
        id="brandSelect"
        placeholder="Selecione Marca"
        label="Marca"
        options={["Selecionar", ...kenzieKarsBrands, "outro"]}
        {...register("brand", { required: "Informe a marca" })}
        onChange={(e) => {
          getKenzieKarsByBrand(e.target.value)
        }}
      />
      <SelectValidator
        id="modelSelect"
        label="Modelo"
        options={["Selecionar", ...kenzieKars.map((kar) => kar.name), "outro"]}
        placeholder="Selecione o Modelo"
        {...register("model", { required: "Informe o modelo" })}
        onChange={(e) => getKenzieKar(e.target.value)}
      ></SelectValidator>
      <StyledInputsContainer>
        <InputValidator
          id="year"
          label="Ano"
          placeholder="Ano"
          value={kenzieKarModel?.year || ""}
          readOnly
        />
        <InputValidator
          id="fuel"
          label="Combustível"
          placeholder="Combustível"
          value={kenzieKarModel?.fuel || ""}
          readOnly
        />
        <InputValidator
          id="mileage"
          label="Quilometragem"
          placeholder="Quilometragem"
          error={errors.mileage?.message}
          {...register("mileage", { required: "Informe a quilometragem" })}
        />
        <InputValidator
          id="color"
          label="Cor"
          placeholder="Cor"
          error={errors.color?.message}
          {...register("color", { required: "Informe a cor" })}
        />
        <InputValidator
          id="tablePrice"
          label="Preço tabela FIPE"
          placeholder="R$ 0.00"
          value={kenzieKarModel?.value || ""}
          readOnly
        />
        <InputValidator
          id="price"
          label="Preço"
          placeholder="Insira o Preço"
          error={errors.price?.message}
          {...register("price", { required: "Informe o preço" })}
        />
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
        id="cover_image"
        label="Imagem de capa"
        placeholder="Insira a imagem de capa aqui"
        error={errors.cover_image?.message}
        {...register("cover_image", { required: "Informe imagem de capa" })}
      />
      {renderImageInput()}
      {/* <Button
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
      </Button> */}
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
