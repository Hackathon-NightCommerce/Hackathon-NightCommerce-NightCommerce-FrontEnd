import { zodResolver } from "@hookform/resolvers/zod"
import { ReactNode, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { userUpdateSchema } from "../../schemas/user.schema"
import { TUpdateUser } from "./../../interfaces/user.interface"
import { InputValidator } from "../inputs"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { useUser } from "./../../hooks/useProduct"

interface IFormEditUserProps {
  onClose: () => void
  children: ReactNode
}

export const FormEditUser = ({ onClose, children }: IFormEditUserProps) => {
  const { updateUser, user, getUser } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateUser>({
    mode: "onBlur",
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      description: user?.description,
      address: user?.address,
    },
  })

  const submit: SubmitHandler<TUpdateUser> = async (data) => {
    if (data.email === user?.email) {
      delete data.email
    }

    await updateUser(data)
    onClose()
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <form onSubmit={handleSubmit(submit)}>
      <InputValidator
        id="name"
        label="Nome"
        {...register("name")}
        error={errors.name?.message}
      />
      <InputValidator
        id="email"
        label="E-mail"
        {...register("email")}
        error={errors.email?.message}
      />
      <InputValidator
        id="phone"
        label="Telefone"
        {...register("phone")}
        error={errors.phone?.message}
      />
      <InputValidator
        id="description"
        label="Descrição"
        {...register("description")}
        error={errors.description?.message}
      />
      <InputValidator
        id="cep"
        label="CEP"
        {...register("address.cep")}
        error={errors.address?.cep?.message}
      />
      <InputValidator
        id="state"
        label="Estado"
        {...register("address.state")}
        error={errors.address?.state?.message}
      />
      <InputValidator
        id="city"
        label="Cidade"
        {...register("address.city")}
        error={errors.address?.city?.message}
      />
      <InputValidator
        id="road"
        label="Rua"
        {...register("address.road")}
        error={errors.address?.road?.message}
      />
      <InputValidator
        id="number"
        label="Número"
        {...register("address.number")}
        error={errors.address?.number?.message}
      />
      <InputValidator
        id="complement"
        label="Complemento"
        {...register("address.complement")}
        error={errors.address?.complement?.message}
      />
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
          Salvar Alterações
        </Button>
      </ButtonGroup>
    </form>
  )
}
