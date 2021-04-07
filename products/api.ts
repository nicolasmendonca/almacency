import axios from "axios";
import Papa from "papaparse";
import { Product } from "./types";

interface ProductApiResponse {
  id: string;
  name: string;
  image: string;
  price: string;
}

export default {
  list: async (): Promise<Product[]> => {
    return axios
      .get(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQDP71ogt9TqCXAJv0oGv7KyHJGwrJb7Nv7iZzAMuPGJNfJFx-E8Xv5ZvhQCdxId94nA5Y-_OKRPSbS/pub?output=csv",
        { responseType: "blob" }
      )
      .then(
        (response) =>
          new Promise<Product[]>((resolve, reject) => {
            Papa.parse<ProductApiResponse>(response.data, {
              header: true,
              complete: (results) =>
                resolve(
                  results.data.map((product) => ({
                    ...product,
                    price: Number(product.price),
                  }))
                ),
              error: (error) => reject(error.message),
            });
          })
      );
  },
};
