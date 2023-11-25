import { useContext } from "react";
import { ProductContext } from "../contexts/products.context";
import { UserContext } from "../contexts/user.context";

export const useProduct = () => {
  const productContext = useContext(ProductContext);
  return productContext;
};
export const useUser = () => {
  const user = useContext(UserContext);
  return user;
};
