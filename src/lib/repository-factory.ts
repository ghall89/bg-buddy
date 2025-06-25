'use server';

import GameRepository from './repositories/game-repository';
import PlayLogPlayerRepository from './repositories/play-log-player-repository';
import PlayLogRepository from './repositories/play-log-repository';
import UserGameRepository from './repositories/user-game-repository';
import UserRepository from './repositories/user-repository';

const repositories = {
  game: () => new GameRepository(),
  playLogPlayer: () => new PlayLogPlayerRepository(),
  playLog: () => new PlayLogRepository(),
  userGame: () => new UserGameRepository(),
  user: () => new UserRepository(),
} as const;

export type RepositoryKey = keyof typeof repositories;

type MethodNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

type GameRepositoryMethods = MethodNames<GameRepository>;
type PlayLogPlayerRepositoryMethods = MethodNames<PlayLogPlayerRepository>;
type PlayLogRepositoryMethods = MethodNames<PlayLogRepository>;
type UserGameRepositoryMethods = MethodNames<UserGameRepository>;
type UserRepositoryMethods = MethodNames<UserRepository>;

export type RepositoryMethodMap = {
  game: GameRepositoryMethods;
  playLogPlayer: PlayLogPlayerRepositoryMethods;
  playLog: PlayLogRepositoryMethods;
  userGame: UserGameRepositoryMethods;
  user: UserRepositoryMethods;
};

export type RepositoryMethodName<K extends RepositoryKey> =
  RepositoryMethodMap[K];

export type RepositoryMethodParams<
  K extends RepositoryKey,
  M extends RepositoryMethodName<K>,
> = K extends 'game'
  ? M extends keyof GameRepository
    ? GameRepository[M] extends (...args: infer P) => any
      ? P
      : never
    : never
  : K extends 'playLogPlayer'
    ? M extends keyof PlayLogPlayerRepository
      ? PlayLogPlayerRepository[M] extends (...args: infer P) => any
        ? P
        : never
      : never
    : K extends 'playLog'
      ? M extends keyof PlayLogRepository
        ? PlayLogRepository[M] extends (...args: infer P) => any
          ? P
          : never
        : never
      : K extends 'userGame'
        ? M extends keyof UserGameRepository
          ? UserGameRepository[M] extends (...args: infer P) => any
            ? P
            : never
          : never
        : K extends 'user'
          ? M extends keyof UserRepository
            ? UserRepository[M] extends (...args: infer P) => any
              ? P
              : never
            : never
          : never;

export type RepositoryMethodReturn<
  K extends RepositoryKey,
  M extends RepositoryMethodName<K>,
> = K extends 'game'
  ? M extends keyof GameRepository
    ? GameRepository[M] extends (...args: any[]) => infer R
      ? R
      : never
    : never
  : K extends 'playLogPlayer'
    ? M extends keyof PlayLogPlayerRepository
      ? PlayLogPlayerRepository[M] extends (...args: any[]) => infer R
        ? R
        : never
      : never
    : K extends 'playLog'
      ? M extends keyof PlayLogRepository
        ? PlayLogRepository[M] extends (...args: any[]) => infer R
          ? R
          : never
        : never
      : K extends 'userGame'
        ? M extends keyof UserGameRepository
          ? UserGameRepository[M] extends (...args: any[]) => infer R
            ? R
            : never
          : never
        : K extends 'user'
          ? M extends keyof UserRepository
            ? UserRepository[M] extends (...args: any[]) => infer R
              ? R
              : never
            : never
          : never;

export async function repoAction<
  K extends RepositoryKey,
  M extends RepositoryMethodName<K>,
>(
  repositoryKey: K,
  methodName: M,
  ...args: RepositoryMethodParams<K, M>
): Promise<RepositoryMethodReturn<K, M>> {
  const repo = repositories[repositoryKey]();
  const method = (repo as any)[methodName];

  if (typeof method !== 'function') {
    throw new Error(
      `Method '${methodName}' not found on ${repositoryKey} repository`,
    );
  }

  return method.apply(repo, args);
}
