import { ReactNode, createContext } from "react"
import { ProductProvider } from "./products.context"
import { UserProvider } from "./user.context"

interface iContextProps {
  children: ReactNode
}

export const Context = createContext({})

export const Provider = ({ children }: iContextProps) => {
  return (
    <Context.Provider value={{}}>
      <UserProvider>
        <ProductProvider>
          {children}
        </ProductProvider>
      </UserProvider>
    </Context.Provider>
  )
}
