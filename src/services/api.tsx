import axios from "axios";
import { Delivery } from "@/models/Delivery";
import { Drivers } from "@/models/Drivers";

const BASE_URL = "https://api-deslocamento.herokuapp.com/api/v1/";

async function getDelivery(): Promise<Delivery[]> {
  const { data } = await axios.get<Delivery[]>(`${BASE_URL}Deslocamento`);

  return data;
}

async function getDrivers(): Promise<Drivers[]> {
  const { data } = await axios.get<Drivers[]>(`${BASE_URL}Condutor`);

  console.log(data);

  return data;
}

export const api = {
  getDelivery,
  getDrivers,
};
