import { ReactNode, createContext, useState } from "react";
import { TCreateAdvertData, TPagination } from "../interfaces/advert.interface";
import { api, apiKenzie } from "../services/api";
import { TKenzieKars } from "../interfaces/kenzieKars.interface";
import { useToast } from "@chakra-ui/react";
import { useUser } from "./../hooks/useProduct";
import { AxiosError } from "axios";
import {
  CategoryProduct,
  TAdvert,
  TUpdateAdvert,
} from "../schemas/advert.schema";
import { TCommentRequest } from "../interfaces/comment.interface";

interface iProductContextProps {
  children: ReactNode;
}

type TFilters = {
  name?: string | undefined;
  brand?: string | undefined;
  price?: number | undefined;
  description?: string | undefined;
  cover_image?: string | undefined;
  information_additional?: string | null | undefined;
  category?: CategoryProduct | undefined;
  published?: boolean | undefined;
  qtd?: number | undefined;
  promotion?: boolean | undefined;
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

  // Pagination
  page: TPagination | undefined;
  previusPage: (data: TFilters) => Promise<void>;
  nextPage: (data: TFilters) => Promise<void>;
  paginationByNumber: (page: number, data: TFilters) => Promise<void>;

  // Filters
  filters: TFilters | null;
  setFilters: React.Dispatch<React.SetStateAction<TFilters | null>>;

  // Kenzie Kars
  getKenzieKarsInformation: () => Promise<void>;
  getKenzieKarsByBrand: (brand: string) => Promise<void>;
  kenzieKars: TKenzieKars[];
  kenzieKarsBrands: string[];
  kenzieKarModel: TKenzieKars | undefined;
  getKenzieKar: (model: string) => Promise<void>;

  // Advert
  createAdvert: (data: TCreateAdvertData) => Promise<boolean>;
  getAdvert: (idAdvert: number) => Promise<void>;
  advert: TAdvert | undefined;
  adminDeleteAdvert: (idAdvert: number, idUser: string) => void;
  updateAdvert: (id: number, data: TUpdateAdvert) => Promise<boolean>;
  // Cart
  onCart: [];
  setOnCart: React.Dispatch<React.SetStateAction<[]>>;

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

  uploadFile: (file: any) => void;
}

export const ProductContext = createContext({} as IProductProvider);

export const ProductProvider = ({ children }: iProductContextProps) => {
  const [advert, setAdverts] = useState<TAdvert | undefined>();
  const [page, setPage] = useState<TPagination>();
  const [filters, setFilters] = useState<TFilters | null>(null);
  const [kenzieKars, setKenzieKars] = useState<TKenzieKars[]>([]);
  const [kenzieKarsBrands, setKenzieKarsBrands] = useState<string[]>([]);
  const [comments, setComments] = useState([]);
  const [onCart, setOnCart] = useState<[]>([]);

  const [kenzieKarModel, setKenzieKarModel] = useState<
    TKenzieKars | undefined
  >();

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

  const updateAdvert = async (id: number, data: TUpdateAdvert) => {
    const { images, ...rest } = data;
    try {
      const listFilter = announceListUser?.adverts.find((ad) => ad.id == id);
      const mapList = listFilter!.images.map(async (img) => {
        let boolean = false;
        let data;
        let dataPatch;
        images.map(async (imageData) =>
          imageData.id == img.id
            ? ((boolean = true), (dataPatch = imageData))
            : (data = imageData)
        );
        boolean
          ? await api.patch(`/adverts/images/${img.id}`, dataPatch, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          : await api.post(`/adverts/images/${id}`, data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      });
      await Promise.all(mapList);
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
      data.published = true;
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

  const uploadFile = async (file: any) => {
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

  const queryParams = (data: TFilters) => {
    const queryParam = new URLSearchParams();

    const filterKeys = {
      name: data.name,
      brand: data.brand,
      price: data.price,
      category: data.category,
      published: data.published,
      qtd: data.qtd,
      promotion: data.promotion,
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

  const getKenzieKarsInformation = async () => {
    const response = await apiKenzie.get("/cars");
    setKenzieKarsBrands(Object.keys(response.data));
  };
  const getKenzieKarsByBrand = async (brand: string) => {
    const response = await apiKenzie.get(`/cars?brand=${brand}`);
    setKenzieKars(response.data);
  };
  const getKenzieKar = async (name: string) => {
    const kar = kenzieKars.find((kar) => kar.name == name);
    if (kar?.fuel == 1) {
      kar.fuel = "flex";
    } else if (kar?.fuel == 2) {
      kar.fuel = "hibrido";
    } else if (kar?.fuel == 3) {
      kar.fuel = "eletrico";
    }

    setKenzieKarModel(kar);
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

        // Pagination
        previusPage,
        nextPage,
        paginationByNumber,

        // Kenzie Kars
        getKenzieKarsByBrand,
        kenzieKars,
        kenzieKarsBrands,
        getKenzieKarsInformation,
        kenzieKarModel,
        getKenzieKar,

        // Advert
        createAdvert,
        getAdvert,
        advert,
        adminDeleteAdvert,
        updateAdvert,
        onCart,
        setOnCart,

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
