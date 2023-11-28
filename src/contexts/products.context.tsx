import { ReactNode, createContext, useState } from "react";
import {
  TAdvertItensCart,
  TCreateAdvertData,
  TPagination,
} from "../interfaces/advert.interface";
import { api } from "../services/api";
import { useToast } from "@chakra-ui/react";
import { useUser } from "./../hooks/useProduct";
import { AxiosError } from "axios";
import {
  CategoryProduct,
  TAdvert,
  TUpdateAdvert,
} from "../schemas/advert.schema";
import { TCommentRequest } from "../interfaces/comment.interface";
import { CartShemaRequest } from "../interfaces/cart.interfaces";
import { TProductsUserSalveAtCart } from "../interfaces/user.interface";
interface iProductContextProps {
  children: ReactNode;
}

type TFilters = {
  nameAdvert?: string[] | undefined;
  brandAdvert?: string[] | undefined;
  categoryAdvert?: string[] | undefined;
  promotionAdvert?: string[] | undefined;
  minPrice?: number;
  maxPrice?: number;
};

type TFiltersReq = {
  brand?: string[] | undefined;
  category?: string[] | undefined;
  name?: string[] | undefined;
  promotion?: string[] | undefined;
  minPrice?: number;
  maxPrice?: number;
};
type TErrorResponse = {
  message: {
    [key: string]: unknown;
  };
};


interface IProductProvider {
  // Adverts
  getAdverts: () => void;
  getAdvertsByFilter: (data: TFilters) => Promise<void>;
  getAdvertsSherad: (searchTerm: string) => void;

  // Pagination
  page: TPagination | undefined;
  previusPage: (data: TFilters) => Promise<void>;
  nextPage: (data: TFilters) => Promise<void>;
  paginationByNumber: (page: number, data: TFilters) => Promise<void>;

  // Filters
  filters: TFilters | null;
  setFilters: React.Dispatch<React.SetStateAction<TFilters | null>>;

  // Advert
  createAdvert: (data: TCreateAdvertData) => Promise<boolean>;
  getAdvert: (idAdvert: number) => Promise<void>;
  advert: TAdvert | undefined;
  adminDeleteAdvert: (idAdvert: number, idUser: string) => void;
  updateAdvert: (id: number, data: TUpdateAdvert) => Promise<boolean>;
  // Cart
  onCart: TAdvertItensCart[];
  setOnCart: React.Dispatch<React.SetStateAction<TAdvertItensCart[]>>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  createCart: (products: CartShemaRequest) => Promise<void>;
  getProductsSalveAtCart: () => Promise<void>;
  payment: (products: CartShemaRequest) => Promise<void>;

  // Comments
  getComments: () => void;
  comments: TCommentRequest[];
  setComment: (comment: TCommentRequest, id: string) => void;
  updateComment: (
    comment: object,
    idComment: number,
    idAdvert: number
  ) => Promise<void>;
  deleteComment: (idComment: number, idAdvert: number) => Promise<void>;
  uploadFile: (file: File) => void;

  spinnerCart: boolean;
  setSpinnerCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProductContext = createContext({} as IProductProvider);

export const ProductProvider = ({ children }: iProductContextProps) => {
  const [advert, setAdverts] = useState<TAdvert | undefined>();
  const [page, setPage] = useState<TPagination>();
  const [filters, setFilters] = useState<TFilters | null>(null);
  const [comments, setComments] = useState([]);
  const [onCart, setOnCart] = useState<TAdvertItensCart[]>([]);
  const [total, setTotal] = useState<number>(0.0);
  const [spinnerCart, setSpinnerCart] = useState<boolean>(false);

  const toast = useToast();
  const { getAnnounceUser, announceListUser } = useUser();
  const id = localStorage.getItem("@ID");
  const token = localStorage.getItem("@TOKEN");

  const createCart = async () => {
    try {
      await api.post(`/cart`);
    } catch (error) {
      console.error(error);
    }
  };

  const adminDeleteAdvert = async (idAdvert: number, idUser: string) => {
    try {
      await api.delete(`/adverts/${idAdvert}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: `Anuncio deletado com sucesso 😁`,
        status: "success",
        position: "top-right",
        isClosable: true,
      });
      getAnnounceUser(idUser);
    } catch (error) {
      toast({
        title: `Ops, algum deu errado`,
        status: "error",
        position: "top-right",
        isClosable: true,
      });
      console.log(error);
    }
  };
  const getProductsSalveAtCart = async (): Promise<void> => {
    try {
      const products: TProductsUserSalveAtCart = (
        await api.get("/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data;
      const cartItems: TAdvertItensCart[] = products.itemsCart.map((item) => ({
        id: item.advert_id.id,
        name: item.advert_id.name,
        brand: item.advert_id.brand,
        price: item.advert_id.price,
        description: item.advert_id.description,
        cover_image: item.advert_id.cover_image,
        information_additional: item.advert_id.information_additional,
        category: item.advert_id.category as CategoryProduct,
        published: item.advert_id.published,
        qtd: item.advert_id.qtd,
        itemCart: item.qtd,
        promotion: item.advert_id.promotion,
      }));
      setOnCart(cartItems);
    } catch (error) {
      console.log(error);
    }
  };

  const payment = async (products: CartShemaRequest): Promise<void> => {
    setSpinnerCart(true);
    try {
      const linkPay: string = (
        await api.post("/payment", products, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data;

      setSpinnerCart(false);
      window.location.href = linkPay;
    } catch (error) {
      if ((error as AxiosError).response?.status != 500) {
        const err = error as AxiosError<TErrorResponse>;

        toast({
          title: `${err.response?.data.message}`,
          status: "error",
          position: "top-right",
          isClosable: true,
        });
        setSpinnerCart(false);
      } else {
        toast({
          title: `Algo deu errado aqui estamos arrumando 😁`,
          status: "warning",
          position: "top-right",
          isClosable: true,
        });
        console.log(error);
      }
    }
  };
  const updateAdvert = async (id: number, data: TUpdateAdvert) => {
    const { ...rest } = data;
    try {
      await api.patch(`/adverts/${id}`, rest, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await api.patch;
      toast({
        title: `Anuncio editado com sucesso 😁`,
        status: "success",
        position: "top-right",
        isClosable: true,
      });
      getAnnounceUser(announceListUser!.id.toString());
      return true;
    } catch (error) {
      toast({
        title: `Ops, algum deu errado`,
        status: "error",
        position: "top-right",
        isClosable: true,
      });
      console.log(error);
      return false;
    }
  };

  const getAdverts = async () => {
    const [products, filters] = await Promise.all([
      api.get("/adverts/"),
      api.get("/adverts/adverts-filters"),
    ]);

    setPage(products.data);
    setFilters(filters.data);
  };

  const getAdvertsSherad = async (searchTerm: string) => {
    const [products, filters] = await Promise.all([
      api.get(`/adverts/sherad/?product=${searchTerm}`),
      api.get("/adverts/adverts-filters"),
    ]);

    setPage(products.data);
    setFilters(filters.data);
  };

  const getAdvert = async (idAdvert: number) => {
    const product = await api.get(`/adverts/${idAdvert}`);
    setAdverts(product.data);
  };

  const updateComment = async (
    comment: object,
    idComment: number,
    idAdvert: number
  ) => {
    try {
      await api.patch(`/comments/${idComment}`, comment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: `Comentario atualizado com sucesso 😁`,
        status: "success",
        position: "top-right",
        isClosable: true,
      });

      await getAdvert(idAdvert);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (idComment: number, idAdvert: number) => {
    try {
      await api.delete(`/comments/${idComment}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: `Comentario Deletado com sucesso 😁`,
        status: "success",
        position: "top-right",
        isClosable: true,
      });
      await getAdvert(idAdvert);
    } catch (error) {
      console.log(error);
    }
  };

  const createAdvert = async (data: TCreateAdvertData) => {
    try {
      await api.post("/adverts/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getAnnounceUser(id!);
      toast({
        title: `Sucesso  😁`,
        status: "success",
        position: "top-right",
        isClosable: true,
      });
      return true;
    } catch (error) {
      if ((error as AxiosError).response?.status != 500) {
        const err = error as AxiosError<TErrorResponse>;
        for (const key in err.response?.data.message) {
          toast({
            title: `${key} : ${err.response?.data.message[key]}`,
            status: "error",
            position: "top-right",
            isClosable: true,
          });
        }
      } else {
        toast({
          title: `Algo deu errado aqui estamos arrumando 😁`,
          status: "warning",
          position: "top-right",
          isClosable: true,
        });
        console.log(error);
      }
      return false;
    }
  };

  const uploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await api.post("/uploadFile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return result.status;
    } catch (error) {
      toast({
        title: `Algo deu errado aqui estamos arrumando 😁`,
        status: "warning",
        position: "top-right",
        isClosable: true,
      });
      console.log(error);
    }
  };

  const queryParams = (data: TFiltersReq) => {
    const queryParam = new URLSearchParams();

    const filterKeys = {
      brandAdvert: data.brand,
      categoryAdvert: data.category,
      maxPrice: data.maxPrice,
      minPrice: data.minPrice,
      nameAdvert: data.name,
      promotionAdvert: data.promotion,
    };

    for (const [key, value] of Object.entries(filterKeys)) {
      if (!Array.isArray(value) && value !== undefined) {
        queryParam.append(key, String(value));
      } else if (Array.isArray(value) && value.length === 1) {
        queryParam.append(key, String(value[0]));
      }
    }

    return queryParam.toString();
  };

  const getAdvertsByFilter = async (data: TFilters) => {
    const query = queryParams(data);
    console.log(query);

    const [advertsFilter, productOption] = await Promise.all([
      api.get(`/adverts/filtered?${query}`),
      api.get(`/adverts/adverts-filters?${query}`),
    ]);
    setPage(advertsFilter.data);
    setFilters(productOption.data);
  };

  const previusPage = async (data: TFilters) => {
    const query = queryParams(data);

    if (page?.prevPage) {
      const url: string[] = page.prevPage.split("/");
      const pageURL = url[4].split(" ");

      const queryString = pageURL[0];
      const match = queryString.match(/\d+/);

      const pages = match ? parseInt(match[0]) : null;

      const response = await api.get(
        `/adverts/filtered?page=${pages}&${query}`
      );
      setPage(response.data);
    }
  };
  const nextPage = async (data: TFilters) => {
    const query = queryParams(data);

    if (page?.nextPage) {
      const url: string[] = page.nextPage.split("/");
      const pageURL = url[4].split(" ");

      const queryString = pageURL[0];
      const match = queryString.match(/\d+/);

      const pages = match ? parseInt(match[0]) : null;

      const response = await api.get(
        `/adverts/filtered?page=${pages}&${query}`
      );

      setPage(response.data);
    }
  };

  const paginationByNumber = async (page: number, data: TFilters) => {
    const query = queryParams(data);
    const response = await api.get(`/adverts/filtered?page=${page}&${query}`);
    setPage(response.data);
  };

  const getComments = async () => {
    try {
      const id = localStorage.getItem("@ID-ADVERT");
      const response = await api.get(`/comments/advert/${id}`);
      setComments(response.data);
      toast({
        title: `Sucesso  😁`,
        status: "success",
        position: "top-right",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `Algo deu errado aqui estamos arrumando 😁`,
        status: "error",
        position: "top-right",
        isClosable: true,
      });
      console.log(error);
    }
  };

  const setComment = async (comment: TCommentRequest, id: string) => {
    try {
      await api.post(`/comments/advert/${id}`, comment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getAdvert(parseInt(id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProductContext.Provider
      value={{
        // Adverts
        page,
        getAdverts,
        filters,
        setFilters,
        getAdvertsByFilter,
        getAdvertsSherad,

        // Pagination
        previusPage,
        nextPage,
        paginationByNumber,

        // Advert
        createAdvert,
        getAdvert,
        advert,
        adminDeleteAdvert,
        updateAdvert,
        onCart,
        setOnCart,
        setTotal,
        total,
        createCart,
        getProductsSalveAtCart,
        payment,
        setSpinnerCart,
        spinnerCart,

        // Comments
        getComments,
        setComment,
        comments,
        updateComment,
        deleteComment,

        //File
        uploadFile,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
