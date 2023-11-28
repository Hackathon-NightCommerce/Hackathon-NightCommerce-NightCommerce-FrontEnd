import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { createAdvertSchemaValidator } from "../../schemas/advert.schema";
import { TAdverData } from "../../interfaces/advert.interface";
import { InputValidator } from "../inputs";
import { useProduct } from "../../hooks/useProduct";
import { ReactNode, useState } from "react";
import { Button, ButtonGroup, Checkbox, Select } from "@chakra-ui/react";
import {
  BannerCouser,
  BannerImage,
  ContanerBannerImage,
  Erros,
  StyledInputsContainer,
} from "./style";
import uploudBanner from "../../assets/uploudBanner.svg";

interface IFormCreateAdvertProps {
  onClose: () => void;
  children: ReactNode;
}

export const FormCreateAdvert = ({
  onClose,
  children,
}: IFormCreateAdvertProps) => {
  const [files, setFile] = useState<File[]>();

  const { createAdvert } = useProduct();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAdverData>({
    resolver: zodResolver(createAdvertSchemaValidator),
  });

  const handleFileChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = target.files?.[0];
    setFile((prevFiles) =>
      prevFiles
        ? ([...prevFiles, selectedFile] as File[]).filter(Boolean)
        : ([selectedFile] as File[]).filter(Boolean)
    );
  };

  async function getBase64(imageFile: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!imageFile) {
        reject(new Error("Nenhuma imagem fornecida."));
        return;
      }

      const reader = new FileReader();

      reader.readAsDataURL(imageFile);

      reader.onload = function () {
        resolve(reader.result as string);
      };

      reader.onerror = function (error) {
        reject(error);
      };
    });
  }

  const submit: SubmitHandler<TAdverData> = async (data) => {
    const images = await Promise.all(
      files?.map((image) => getBase64(image)) || []
    );
    const fullData = {
      ...data,
      price: Number(data.price),
      qtd: Number(data.qtd),
      images,
    };

    const close = await createAdvert(fullData);
    if (close) {
      onClose();
    }
  };

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
            padding: "10px",
            border: "1px solid var(--brand1)",
          }}
          id="promotion"
          {...register("promotion", { required: "" })}
        >
          Esse preço e promocional ?
        </Checkbox>

        <Checkbox
          style={{
            padding: "10px",
            border: "1px solid var(--brand1)",
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
        {...register("information_additional", {
          required: "Informação Adcional",
        })}
      />
      <Select
        placeholder="Selecione a categoria"
        {...register("category", {
          required: "Por favor, selecione a categoria",
        })}
      >
        <option value="Eletrônicos">Eletrônicos</option>
        <option value="Moda e Vestuário">Moda e Vestuário</option>
        <option value="Casa e Cozinha">Casa e Cozinha</option>
        <option value="Livros e Mídia">Livros e Mídia</option>
        <option value="Beleza e Cuidados Pessoais">
          Beleza e Cuidados Pessoais
        </option>
        <option value="Brinquedos e Jogos">Brinquedos e Jogos</option>
        <option value="Saúde e Bem-Estar">Saúde e Bem-Estar</option>
        <option value="Automotivo">Automotivo</option>
        <option value="Alimentos e Bebida">Alimentos e Bebida</option>
        <option value="Móveis e Decoração">Móveis e Decoração</option>
      </Select>
      {errors.category?.message && <Erros>{errors.category?.message}</Erros>}
      <BannerCouser htmlFor="image">
        <input
          id="image"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />

        <div>
          <figure>
            <img
              src={uploudBanner}
              width={25}
              height={25}
              alt="imagem de perfil"
            />
          </figure>
          <p>Arraste pra cá o arquivo ou aperte para adicionar</p>
        </div>
      </BannerCouser>

      <ContanerBannerImage>
        {files?.map((file, index) => (
          <BannerImage src={URL.createObjectURL(file)} alt="" key={index} />
        ))}
      </ContanerBannerImage>
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
