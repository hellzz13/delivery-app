import * as React from "react";

export function useDetails<T>(
  fetchData: (id: string) => Promise<T>,
  id: string
) {
  const [data, setData] = React.useState<T | undefined>(undefined);

  React.useEffect(() => {
    fetchData(id).then((res: T) => setData(res));
  }, [fetchData, id]);

  return {
    data,
  };
}
