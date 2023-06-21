import axios from "axios";
import { Delivery } from "@/models/Delivery";
import { Drivers } from "@/models/Drivers";
import { Consumer } from "@/models/Consumer";

const BASE_URL = "https://api-deslocamento.herokuapp.com/api/v1/";

async function getDelivery(): Promise<Delivery[]> {
  const { data } = await axios.get<Delivery[]>(`${BASE_URL}Deslocamento`);

  return data;
}

async function getDrivers(): Promise<Drivers[]> {
  const { data } = await axios.get<Drivers[]>(`${BASE_URL}Condutor`);

  return data;
}

async function getConsumers(): Promise<Consumer[]> {
  const { data } = await axios.get<Consumer[]>(`${BASE_URL}Cliente`);

  console.log(data);

  return data;
}

export const api = {
  getDelivery,
  getDrivers,
  getConsumers,
};
