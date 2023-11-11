import { Button } from "@chakra-ui/react"
import { useUser } from "../../../hooks/useProduct"

export const DeleteUser = () => {
  const { deleteUser } = useUser()

  return (
    <Button
      width={"fit-content"}
      mr={3}
      backgroundColor="var(--alert1)"
      onClick={deleteUser}
      color="var(--grey8)"
      borderRadius="10px"
      border="1px solid var(--alert1)"
      transition="0.5s"
      _hover={{
        bg: "transparent",
        color: "var(--alert1)",
        transition: "0.5s",
      }}
    >
      Excluir Usuário
    </Button>
    // add modal de confirmacão de deleção
  )
}
