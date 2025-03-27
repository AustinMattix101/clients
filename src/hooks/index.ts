export { default as useFetch} from "./useFetch";
export { default as useFetchPrivateData} from "./useFetchPrivateData";

export interface IFetchData {
    data: {
      success: boolean;
      status: string;
      message?: string;
      error?: string;
      data: {
        username?: string;
        email?: string;
        image?: string
      };
    }[];
    statusCode: number;
  }