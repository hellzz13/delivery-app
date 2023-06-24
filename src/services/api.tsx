import axios from "axios";
import { Delivery } from "@/models/Delivery";
import { Drivers } from "@/models/Drivers";
import { Consumer } from "@/models/Consumer";
import { Vehicle } from "@/models/Vehicle";

const api = axios.create({
  baseURL: "https://api-deslocamento.herokuapp.com/api/v1/",
});

export default api;

// get
async function getDelivery(): Promise<Delivery[]> {
  const { data } = await api.get<Delivery[]>(`Deslocamento`);

  return data;
}
async function getDeliveryById(id: string): Promise<Delivery> {
  const { data } = await api.get<Delivery>(`Deslocamento/${id}`);

  return data;
}

async function getDrivers(): Promise<Drivers[]> {
  const { data } = await api.get<Drivers[]>(`Condutor`);

  return data;
}
async function getDriversById(id: string): Promise<Drivers> {
  const { data } = await api.get<Drivers>(`Condutor/${id}`);

  return data;
}

async function getConsumers(): Promise<Consumer[]> {
  const { data } = await api.get<Consumer[]>(`Cliente`);

  return data;
}
async function getConsumerById(id: string): Promise<Consumer> {
  const { data } = await api.get<Consumer>(`Cliente/${id}`);

  return data;
}

async function getVehicle(): Promise<Vehicle[]> {
  const { data } = await api.get<Vehicle[]>(`Veiculo`);

  return data;
}
async function getVehicleById(id: string): Promise<Vehicle> {
  const { data } = await api.get<Vehicle>(`Veiculo/${id}`);

  return data;
}

// DELETE

async function deleteData(id: string, urlRoute: string) {
  await api.delete(`${urlRoute}/${id}`, { data: { id: id } });
}

// PUT

async function changeData<T>(values: T, id: string, urlRoute: string) {
  const data = {
    ...values,
    id: Number(id),
  };
  await api.put(`${urlRoute}/${id}`, data);
}

export const get = {
  getDelivery,
  getDrivers,
  getConsumers,
  getVehicle,

  getDeliveryById,
  getDriversById,
  getConsumerById,
  getVehicleById,
};

export const remove = {
  deleteData,
};

export const update = {
  changeData,
};
