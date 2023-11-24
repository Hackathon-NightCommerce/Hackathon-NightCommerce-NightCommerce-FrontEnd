import { ReactNode, createContext, useState } from "react"
import { api } from "../services/api"
import { TUser, TUpdateUser, TRegisterUser } from "../interfaces/user.interface"
import { IAdvertsByUserId } from "../schemas/advertsByUserId.schema"
import { useToast } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { LoginData } from "../pages/Login/validators"
import { AxiosError } from "axios"

interface TUserProviderProps {
  children: ReactNode
}

type TErrorResponse = {
  message: {
    [key: string]: unknown
  }
}

interface TUserContext {
  userId: string | null
  user: TUser | null
  getUser: () => Promise<void>
  announceListUser: IAdvertsByUserId | undefined
  getAnnounceUser: (id: number | string) => Promise<void>
  setAnnounceListUser: React.Dispatch<
    React.SetStateAction<IAdvertsByUserId | undefined>
  >
  updateUser: (data: TUpdateUser) => Promise<boolean>
  login: (data: LoginData) => Promise<void>
  registerUser: (formData: TRegisterUser) => Promise<void>
  loadingBnt: boolean
  setLoadingBnt: React.Dispatch<React.SetStateAction<boolean>>
  deleteUser: () => Promise<void>
  logoutUser: () => void
  sendEmail: (email: string) => void
  updateForgoutPassword: (password: string, token: string) => void
  forgotPassword: boolean
  setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserContext = createContext({} as TUserContext)

export const UserProvider = ({ children }: TUserProviderProps) => {
  const [user, setUser] = useState<TUser | null>(null)
  const [announceListUser, setAnnounceListUser] = useState<IAdvertsByUserId>()
  const [loadingBnt, setLoadingBnt] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(true)

  const navigate = useNavigate()
  const toast = useToast()
  const userId = localStorage.getItem("@ID")
  const token = localStorage.getItem("@TOKEN")
  const headerAuthorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const sendEmail = async (email: string) => {
    toast({
      title: `Carregando`,
      status: "loading",
      position: "top-right",
      isClosable: true,
    })
    try {
      await api.post("/recoverPassword", { email: email })
      toast({
        title: `Enviamos um link de recuperação no seu email, por favor verifica o seu email`,
        status: "success",
        position: "top-right",
        isClosable: true,
      })
    } catch (error) {
      if ((error as AxiosError).response?.status !== 500) {
        toast({
          title: `Esse Email não existe na plataforma`,
          status: "error",
          position: "top-right",
          isClosable: true,
        })
      } else {
        toast({
          title: `Algo deu errado,tente novamente`,
          status: "error",
          position: "top-right",
          isClosable: true,
        })
      }
    }
  }

  const updateForgoutPassword = async (password: string, token: string) => {
    try {
      await api.patch(`/recoverPassword/${token}`, { password: password })
      toast({
        title: `Senha alterada com sucesso`,
        status: "success",
        position: "top-right",
        isClosable: true,
      })
      setTimeout(() => {
        navigate("/login")
      }, 1500)
    } catch (error) {
      console.log(error)
      toast({
        title: `Algo deu errado, tente novamente`,
        status: "error",
        position: "top-right",
        isClosable: true,
      })
    }
  }

  const getUser = async () => {
    try {
      if (userId) {
        const userResponse = await api.get(`/users/${userId}`, headerAuthorization)
        setUser(userResponse.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateUser = async (data: TUpdateUser) => {
    try {
      setLoadingBnt(true)

      const response = await api.patch(`/users`, data, headerAuthorization)
      setUser(response.data)
      toast({
        title: `Sucesso  😁`,
        status: "success",
        position: "top-right",
        isClosable: true,
      });
      return true;
    } catch (error) {
      if ((error as AxiosError).response?.status != 500) {
        const err = error as AxiosError<TErrorResponse>
        console.log(err)

        toast({
          title: `${err.response?.data.message}`,
          status: "error",
          position: "top-right",
          isClosable: true,
        })
      } else {
        toast({
          title: `Algo deu errado aqui estamos arrumando 😔`,
          status: "warning",
          position: "top-right",
          isClosable: true,
        })
        console.log(error)
      }
      setLoadingBnt(false)
    }
    return false
  }

  const getAnnounceUser = async (id: number | string) => {
    const response = await api.get(`/users/${id}/adverts/`)
    setAnnounceListUser(response.data)
  }

  const login = async (data: LoginData) => {
    try {
      setLoadingBnt(true)
      const response = await api.post("/login", data)
      const { token, user } = response.data

      api.defaults.headers.common.Authorization = `Bearer ${token}`
      localStorage.setItem("@TOKEN", token)
      localStorage.setItem("@ID", user.id)
      setUser(user)

      const profileRoute =
        user.type_user !== "type_user" ? "/profile" : "/admin"
      toast({
        title: `Sucesso  😁`,
        status: "success",
        position: "top-right",
        isClosable: true,
      })
      setTimeout(() => {
        navigate(profileRoute);
      }, 1500);
    } catch (error: unknown) {
      if ((error as AxiosError).response?.status != 500) {
        toast({
          title: `Email ou Senha invalidos 😔`,
          status: "error",
          position: "top-right",
          isClosable: true,
        })
      } else {
        toast({
          title: `Algo deu errado aqui estamos arrumando 😔`,
          status: "warning",
          position: "top-right",
          isClosable: true,
        })
        console.log(error)
        setLoadingBnt(false)
      }
    } finally {
      setLoadingBnt(false);
    }
  }

  const registerUser = async (formData: TRegisterUser) => {
    try {
      setLoadingBnt(true)
      const response = await api.post("/users", formData)

      toast({
        title: `Sucesso  😁`,
        status: "success",
        position: "top-right",
        isClosable: true,
      })

      setTimeout(() => {
        navigate("/login")
      }, 1500)

      setUser(response.data.user)
    } catch (error) {
      if ((error as AxiosError).response?.status != 500) {
        const err = error as AxiosError<TErrorResponse>
        toast({
          title: `Message: ${err.response?.data.message}`,
          status: "error",
          position: "top-right",
          isClosable: true,
        })
      } else {
        toast({
          title: `Algo deu errado aqui estamos arrumando 😔`,
          status: "warning",
          position: "top-right",
          isClosable: true,
        })
        console.log(error)
      }
    } finally {
      setLoadingBnt(false)
    }
  }

  const logoutUser = () => {
    setUser(null)
    localStorage.removeItem("@ID")
    localStorage.removeItem("@TOKEN")
    navigate("/")
  }

  const deleteUser = async () => {
    try {
      if (user?.type_user == "admin") {
        const id = announceListUser!.id
        await api.delete(`/users/${id}`, headerAuthorization)
        toast({
          title: `Usuário excluído com sucesso 😁`,
          status: "success",
          position: "top-right",
          isClosable: true,
        })

        navigate("/")

        return
      }

      await api.delete(`/users/${userId}`, headerAuthorization)

      localStorage.removeItem("@TOKEN")
      localStorage.removeItem("@ID")
      toast({
        title: `Usuário excluído com sucesso 😁`,
        status: "success",
        position: "top-right",
        isClosable: true,
      })

      setTimeout(() => {
        navigate("/login")
      }, 1500)
    } catch (error) {
      toast({
        title: `Algo deu errado aqui estamos arrumando 😔`,
        status: "warning",
        position: "top-right",
        isClosable: true,
      })
      console.log(error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        userId,
        user,
        getUser,
        announceListUser,
        getAnnounceUser,
        setAnnounceListUser,
        updateUser,
        login,
        registerUser,
        loadingBnt,
        setLoadingBnt,
        deleteUser,
        logoutUser,
        sendEmail,
        updateForgoutPassword,
        forgotPassword,
        setForgotPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
