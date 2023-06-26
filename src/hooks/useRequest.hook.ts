import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";

export function useRequest<T>(
  fetchData: (data: T) => Promise<T>,
  queryKey: string
) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(fetchData, {
    onSuccess: (data) => {
      toast.success("Cadastrado realizado com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    onError: (data: { response: { data: string } }) => {
      toast.error(data.response.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKey]);
    },
  });

  const onSubmit = (data: T) => {
    mutate(data);
  };

  return { onSubmit, isLoading };
}
