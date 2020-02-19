import { ApolloError, FetchResult } from '@apollo/client';

import {
  useRemoveCategoryMutation,
  RemoveCategoryMutation,
} from '../../generated/graphql';

// NOTE: the rationale for using a custom hook is for the cache update,
// now the removeCategory function can be used elsewhere with shared cache logic
export const useRemoveCategory = (): [
  (
    id: string,
  ) => Promise<
    FetchResult<
      RemoveCategoryMutation,
      Record<string, any>,
      Record<string, any>
    >
  >,
  boolean,
  ApolloError | undefined,
] => {
  const [
    removeCategoryMutation,
    { loading, error },
  ] = useRemoveCategoryMutation();

  const removeCategory = (id: string) =>
    removeCategoryMutation({
      variables: {
        id,
      },
      update: cache => {
        // evict this item from the in memory cache
        cache.evict(`Category:${id}`);
      },
    });

  return [removeCategory, loading, error];
};
