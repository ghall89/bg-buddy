import { useMutation, useQuery } from '@tanstack/react-query';

import type {
  RepositoryKey,
  RepositoryMethodName,
  RepositoryMethodParams,
  RepositoryMethodReturn,
} from '../repository-factory';
import { repoAction } from '../repository-factory';

export function useRepoQuery<
  K extends RepositoryKey,
  M extends RepositoryMethodName<K>,
>(repositoryKey: K, methodName: M, args: RepositoryMethodParams<K, M>) {
  return useQuery({
    queryFn: async () => repoAction(repositoryKey, methodName, ...args),
    queryKey: [repositoryKey, methodName, ...args],
  });
}

export function useRepoMutation<
  K extends RepositoryKey,
  M extends RepositoryMethodName<K>,
>(repositoryKey: K, methodName: M, args: RepositoryMethodParams<K, M>) {
  return useMutation<
    RepositoryMethodReturn<K, M>,
    Error,
    RepositoryMethodParams<K, M>
  >({
    mutationFn: async (args) => repoAction(repositoryKey, methodName, ...args),
  });
}
