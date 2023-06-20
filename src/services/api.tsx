import axios from "axios";
import { Delivery } from "@/models/Delivery";

const BASE_URL = "https://api-deslocamento.herokuapp.com/api/v1/";

async function getDelivery(): Promise<Delivery[]> {
  const { data } = await axios.get<Delivery[]>(`${BASE_URL}Deslocamento`);

  return data;
}

export const api = {
  getDelivery,
};
