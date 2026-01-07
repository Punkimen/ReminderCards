import { useMutation, useQueryClient, type MutationFunction } from "@tanstack/react-query";

export const useCustomMutation = <TVariables = unknown, TData = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
  queryKey: string,
  onSuccess?: () => void,
  onError?: (error: unknown) => void,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<TData, unknown, TVariables>({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    }
  });

  return mutation;
};
