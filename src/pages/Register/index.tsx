import { useForm } from "react-hook-form";
import StyledRegister from "./style";
import { InputValidator, SelectValidator, TextareaValidator, } from "../../components/inputs";
import { useUser } from './../../hooks/useProduct';
import { zodResolver } from '@hookform/resolvers/zod';
import { userRegisterSchema } from './../../schemas/user.schema';
import { TRegisterUser } from "../../interfaces/user.interface";

const Register = () => {
  const { registerUser, loadingBnt } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterUser>({
    mode: "onBlur",
    resolver: zodResolver(userRegisterSchema)
  });
  const submit = async (data: TRegisterUser) => {
    try {
      await registerUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StyledRegister>
      <div className="register-container">
        <div className="register-box">
          <h1>Cadastro</h1>
          <form onSubmit={handleSubmit(submit)}>
            <InputValidator
              id="name"
              label="Nome:"
              type="text"
              placeholder="Ex: seu nome."
              error={errors.name?.message}
              {...register("name", { required: "Seu nome." })}
            />

            <InputValidator
              id="email"
              label="Email:"
              type="email"
              placeholder="Ex: seuEmail@mail.com."
              error={errors.email?.message}
              {...register("email", { required: "Digite seu email." })}
            />

            <InputValidator
              id="cpf"
              label="CPF:"
              type=""
              placeholder="000.000.000-00"
              error={errors.cpf?.message}
              {...register("cpf", { required: "Digite seu CPF." })}
            />

            <InputValidator
              id="phone"
              label="Telefone:"
              type="number"
              placeholder="(DDD) 90000-0000"
              error={errors.phone?.message}
              {...register("phone", {
                required: "Digite seu número de telefone.",
              })}
            />

            <InputValidator
              id="birth_date"
              label="Data de nascimento:"
              type="date"
              placeholder="0000-00-00"
              error={errors.birth_date?.message}
              {...register("birth_date", {
                required: "Digite sua data de nascimento.",
              })}
            />

            <TextareaValidator
              label="Descrição do usuário."
              id="description"
              error={errors.description?.message}
              placeholder="Descrição do usuário"
              {...register("description", {
                required: "Descrição do usuário.",
              })}
            />

            <InputValidator
              id="cep"
              label="CEP:"
              type="number"
              placeholder="Digite seu cep."
              error={errors.address?.cep?.message}
              {...register("address.cep", { required: "Digite seu cep." })}
            />

            <div className="state-box">
              <InputValidator
                id="state"
                label="Estado:"
                type="text"
                placeholder="Infome seu Estado."
                error={errors.address?.state?.message}
                {...register("address.state", {
                  required: "Informe seu estado.",
                })}
              />

              <InputValidator
                id="city"
                label="Cidade:"
                type="text"
                placeholder="Informe sua cidade."
                error={errors.address?.city?.message}
                {...register("address.city", {
                  required: "Informe sua cidade..",
                })}
              />
            </div>

            <SelectValidator
              label="Selecione a categoria de usuário:"
              id="type_user"
              options={["cliente", "vendedor"]}
              value={["customer", "seller"]}
              error={errors.type_user?.message}
              {...register("type_user", { required: "Qual tipo de usuario." })}
            />

            <InputValidator
              id="road"
              label="Rua:"
              type="text"
              placeholder="Nome da rua onde mora."
              error={errors.address?.road?.message}
              {...register("address.road", {
                required: "Nome da rua onde mora.",
              })}
            />

            <div className="number-box">
              <InputValidator
                id="number"
                label="Numeo da residência:"
                type="number"
                placeholder="Numero da residência."
                error={errors.address?.number?.message}
                {...register("address.number", {
                  required: "Numero da residência.",
                })}
              />

              <InputValidator
                id="complement"
                label="Complemento:"
                type="text"
                placeholder="Complemento."
                error={errors.address?.complement?.message}
                {...register("address.complement", {
                  required: "Complemento.",
                })}
              />
            </div>

            <InputValidator
              id="password"
              label="Senha:"
              type="password"
              placeholder="Senha para acesso."
              error={errors.password?.message}
              {...register("password", { required: "Senha para acesso." })}
            />

            <InputValidator
              id="confirm_password"
              label="Confirmação de senha:"
              type="password"
              placeholder="Confirme sua senha."
              error={errors.confirm_password?.message}
              {...register("confirm_password", {
                required: "Confirme sua senha.",
              })}
            />

            <button type="submit" className="register-btn"
              disabled={
                loadingBnt || (Object.keys(errors).length != 0 && true)
              }>
              Finalizar Cadastro
            </button>
          </form>
        </div>
      </div>
    </StyledRegister>
  );
};

export default Register;
