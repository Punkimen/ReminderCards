import { useMutation, useQueryClient, type MutationFunction } from "@tanstack/react-query";

export const useCustomMutation = <TVariables = unknown, TData = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
  queryKey: string,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<TData, unknown, TVariables>({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return mutation;
};
