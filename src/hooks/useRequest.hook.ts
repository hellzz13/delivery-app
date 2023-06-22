import * as React from "react";
import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";

export function useRequest<T>(
  fetchData: (data: T) => Promise<T>,
  queryKey: string
) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(fetchData, {
    onSuccess: (data) => {
      console.log(data);
      toast.success("Condutor cadastrado com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    onError: () => {
      toast.error(
        "Não foi possível cadastrar o condutor. Verifique os dados!",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKey]);
    },
  });

  const onSubmit = (data: T) => {
    mutate(data);
  };

  console.log(isLoading);

  return { onSubmit };
}
