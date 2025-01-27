import {
  defaultShouldDehydrateQuery,
  Mutation,
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query"
import SuperJSON from "superjson"

export type OnMutationSuccessCallback = <
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown,
>(
  data: TData,
  variables: TVariables,
  context: TContext,
  mutation: Mutation<TData, TError, TVariables, TContext>,
) => void

export type CreateQueryClientOptions = {
  onQueryError?: (error: unknown) => void
  onMutationSuccess?: OnMutationSuccessCallback
  onMutationError?: (error: unknown) => void
}

export function createQueryClient(options: CreateQueryClientOptions = {}) {
  const { onQueryError, onMutationSuccess, onMutationError } = options

  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        onQueryError?.(error)
      },
    }),
    mutationCache: new MutationCache({
      onSuccess: (data, variables, context, mutation) => {
        onMutationSuccess?.(data, variables, context, mutation)
      },
      onError: (error) => {
        onMutationError?.(error)
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
        retry: false,
      },
      mutations: {
        retry: false,
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  })
}
