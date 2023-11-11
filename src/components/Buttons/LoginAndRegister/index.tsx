import { useNavigate } from "react-router";
import { Container } from "./styles";
export const LoginRegisterButtons = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <button
        className="login"
        type="submit"
        onClick={() => navigate("/login")}
      >
        Fazer Login
      </button>
      <button
        className="register"
        type="submit"
        onClick={() => navigate("/register")}
      >
        Cadastrar
      </button>
    </Container>
  );
};
