/* eslint-disable */
import type { Prisma, Account } from '@prisma/client';
import {
    RequestHandlerContext,
    type GetNextArgs,
    type RequestOptions,
    type InfiniteRequestOptions,
    type PickEnumerable,
    type CheckSelect,
    useHooksContext,
} from '@zenstackhq/swr/runtime';
import metadata from './__model_meta';
import * as request from '@zenstackhq/swr/runtime';

export function useMutateAccount() {
    const { endpoint, fetch, logging } = useHooksContext();
    const mutate = request.useMutate('Account', metadata, logging);

    async function createAccount<T extends Prisma.AccountCreateArgs>(
        args: Prisma.SelectSubset<T, Prisma.AccountCreateArgs>,
    ) {
        return await request.post<CheckSelect<T, Account, Prisma.AccountGetPayload<T>>, true>(
            `${endpoint}/account/create`,
            args,
            mutate,
            fetch,
            true,
        );
    }

    async function createManyAccount<T extends Prisma.AccountCreateManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.AccountCreateManyArgs>,
    ) {
        return await request.post<Prisma.BatchPayload, false>(
            `${endpoint}/account/createMany`,
            args,
            mutate,
            fetch,
            false,
        );
    }

    async function updateAccount<T extends Prisma.AccountUpdateArgs>(
        args: Prisma.SelectSubset<T, Prisma.AccountUpdateArgs>,
    ) {
        return await request.put<Prisma.AccountGetPayload<T>, true>(
            `${endpoint}/account/update`,
            args,
            mutate,
            fetch,
            true,
        );
    }

    async function updateManyAccount<T extends Prisma.AccountUpdateManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.AccountUpdateManyArgs>,
    ) {
        return await request.put<Prisma.BatchPayload, false>(
            `${endpoint}/account/updateMany`,
            args,
            mutate,
            fetch,
            false,
        );
    }

    async function upsertAccount<T extends Prisma.AccountUpsertArgs>(
        args: Prisma.SelectSubset<T, Prisma.AccountUpsertArgs>,
    ) {
        return await request.post<Prisma.AccountGetPayload<T>, true>(
            `${endpoint}/account/upsert`,
            args,
            mutate,
            fetch,
            true,
        );
    }

    async function deleteAccount<T extends Prisma.AccountDeleteArgs>(
        args: Prisma.SelectSubset<T, Prisma.AccountDeleteArgs>,
    ) {
        return await request.del<Prisma.AccountGetPayload<T>, true>(
            `${endpoint}/account/delete`,
            args,
            mutate,
            fetch,
            true,
        );
    }

    async function deleteManyAccount<T extends Prisma.AccountDeleteManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.AccountDeleteManyArgs>,
    ) {
        return await request.del<Prisma.BatchPayload, false>(
            `${endpoint}/account/deleteMany`,
            args,
            mutate,
            fetch,
            false,
        );
    }
    return {
        createAccount,
        createManyAccount,
        updateAccount,
        updateManyAccount,
        upsertAccount,
        deleteAccount,
        deleteManyAccount,
    };
}

export function useFindManyAccount<T extends Prisma.AccountFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.AccountFindManyArgs>,
    options?: RequestOptions<Array<Prisma.AccountGetPayload<T>>>,
) {
    const { endpoint, fetch } = useHooksContext();
    return request.useGet<Array<Prisma.AccountGetPayload<T>>>('Account', 'findMany', endpoint, args, options, fetch);
}

export function useInfiniteFindManyAccount<
    T extends Prisma.AccountFindManyArgs,
    R extends Array<Prisma.AccountGetPayload<T>>,
>(
    getNextArgs: GetNextArgs<Prisma.SelectSubset<T, Prisma.AccountFindManyArgs> | undefined, R>,
    options?: InfiniteRequestOptions<Array<Prisma.AccountGetPayload<T>>>,
) {
    const { endpoint, fetch } = useHooksContext();
    return request.useInfiniteGet<
        Prisma.SelectSubset<T, Prisma.AccountFindManyArgs> | undefined,
        Array<Prisma.AccountGetPayload<T>>
    >('Account', 'findMany', endpoint, getNextArgs, options, fetch);
}

export function useFindUniqueAccount<T extends Prisma.AccountFindUniqueArgs>(
    args?: Prisma.SelectSubset<T, Prisma.AccountFindUniqueArgs>,
    options?: RequestOptions<Prisma.AccountGetPayload<T>>,
) {
    const { endpoint, fetch } = useHooksContext();
    return request.useGet<Prisma.AccountGetPayload<T>>('Account', 'findUnique', endpoint, args, options, fetch);
}

export function useFindFirstAccount<T extends Prisma.AccountFindFirstArgs>(
    args?: Prisma.SelectSubset<T, Prisma.AccountFindFirstArgs>,
    options?: RequestOptions<Prisma.AccountGetPayload<T>>,
) {
    const { endpoint, fetch } = useHooksContext();
    return request.useGet<Prisma.AccountGetPayload<T>>('Account', 'findFirst', endpoint, args, options, fetch);
}

export function useAggregateAccount<T extends Prisma.AccountAggregateArgs>(
    args?: Prisma.Subset<T, Prisma.AccountAggregateArgs>,
    options?: RequestOptions<Prisma.GetAccountAggregateType<T>>,
) {
    const { endpoint, fetch } = useHooksContext();
    return request.useGet<Prisma.GetAccountAggregateType<T>>('Account', 'aggregate', endpoint, args, options, fetch);
}

export function useGroupByAccount<
    T extends Prisma.AccountGroupByArgs,
    HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.AccountGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.AccountGroupByArgs['orderBy'] },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>,
    ByFields extends Prisma.MaybeTupleToUnion<T['by']>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<T['having']>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False,
    InputErrors extends ByEmpty extends Prisma.True
        ? `Error: "by" must not be empty.`
        : HavingValid extends Prisma.False
        ? {
              [P in HavingFields]: P extends ByFields
                  ? never
                  : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
          }[HavingFields]
        : 'take' extends Prisma.Keys<T>
        ? 'orderBy' extends Prisma.Keys<T>
            ? ByValid extends Prisma.True
                ? {}
                : {
                      [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
            : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Prisma.Keys<T>
        ? 'orderBy' extends Prisma.Keys<T>
            ? ByValid extends Prisma.True
                ? {}
                : {
                      [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
            : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends Prisma.True
        ? {}
        : {
              [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields],
>(
    args?: Prisma.SubsetIntersection<T, Prisma.AccountGroupByArgs, OrderByArg> & InputErrors,
    options?: RequestOptions<
        {} extends InputErrors
            ? Array<
                  PickEnumerable<Prisma.AccountGroupByOutputType, T['by']> & {
                      [P in keyof T & keyof Prisma.AccountGroupByOutputType]: P extends '_count'
                          ? T[P] extends boolean
                              ? number
                              : Prisma.GetScalarType<T[P], Prisma.AccountGroupByOutputType[P]>
                          : Prisma.GetScalarType<T[P], Prisma.AccountGroupByOutputType[P]>;
                  }
              >
            : InputErrors
    >,
) {
    const { endpoint, fetch } = useHooksContext();
    return request.useGet<
        {} extends InputErrors
            ? Array<
                  PickEnumerable<Prisma.AccountGroupByOutputType, T['by']> & {
                      [P in keyof T & keyof Prisma.AccountGroupByOutputType]: P extends '_count'
                          ? T[P] extends boolean
                              ? number
                              : Prisma.GetScalarType<T[P], Prisma.AccountGroupByOutputType[P]>
                          : Prisma.GetScalarType<T[P], Prisma.AccountGroupByOutputType[P]>;
                  }
              >
            : InputErrors
    >('Account', 'groupBy', endpoint, args, options, fetch);
}

export function useCountAccount<T extends Prisma.AccountCountArgs>(
    args?: Prisma.Subset<T, Prisma.AccountCountArgs>,
    options?: RequestOptions<
        T extends { select: any }
            ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.AccountCountAggregateOutputType>
            : number
    >,
) {
    const { endpoint, fetch } = useHooksContext();
    return request.useGet<
        T extends { select: any }
            ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.AccountCountAggregateOutputType>
            : number
    >('Account', 'count', endpoint, args, options, fetch);
}
