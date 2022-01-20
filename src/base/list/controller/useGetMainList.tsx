import {
    PaginationPayload,
    SortPayload,
    Identifier,
    Record,
    RecordMap,
    Refetch
} from 'react-admin';

import { useQuery } from '../../dataProvider/useQuery';
import { keyBy } from 'lodash';

/**
 * Call the dataProvider.getList() method and return the resolved result
 * as well as the loading state.
 *
 * Uses a special cache to avoid showing an empty list while re-fetching the
 * list after changing params.
 *
 * The return value updates according to the request state:
 *
 * - start: { loading: true, loaded: false, refetch }
 * - success: { data: [data from store], ids: [ids from response], total: [total from response], loading: false, loaded: true, refetch }
 * - error: { error: [error from response], loading: false, loaded: false, refetch }
 *
 * This hook will return the cached result when called a second time
 * with the same parameters, until the response arrives.
 *
 * @param {string} resource The resource name, e.g. 'posts'
 * @param {Object} pagination The request pagination { page, perPage }, e.g. { page: 1, perPage: 10 }
 * @param {Object} sort The request sort { field, order }, e.g. { field: 'id', order: 'DESC' }
 * @param {Object} filter The request filters, e.g. { title: 'hello, world' }
 * @param {Object} options Options object to pass to the dataProvider. May include side effects to be executed upon success or failure, e.g. { onSuccess: { refresh: true } }
 *
 * @returns The current request state. Destructure as { data, total, ids, error, loading, loaded, refetch }.
 *
 * @example
 *
 * import { useGetMainList } from 'react-admin';
 *
 * const LatestNews = () => {
 *     const { data, ids, loading, error } = useGetMainList(
 *         'posts',
 *         { page: 1, perPage: 10 },
 *         { field: 'published_at', order: 'DESC' }
 *     );
 *     if (loading) { return <Loading />; }
 *     if (error) { return <p>ERROR</p>; }
 *     return <ul>{ids.map(id =>
 *         <li key={id}>{data[id].title}</li>
 *     )}</ul>;
 * };
 */
const useGetMainList = <RecordType extends Record = Record>(
    resource: string,
    pagination: PaginationPayload,
    sort: SortPayload,
    filter: object,
    options?: any
): {
    data?: RecordMap<RecordType>;
    ids?: Identifier[];
    total?: number;
    nextToken?: string;
    error?: any;
    loading: boolean;
    loaded: boolean;
    refetch: Refetch;
} => {
    const {
        data,
        total,
        nextToken,
        error,
        loading,
        loaded,
        refetch,
    } = useQuery(
        { type: 'getList', resource, payload: { pagination, sort, filter } },
        options,
    );

    return {
        data: keyBy(data, 'id'),
        ids: data ? data.map(({ id }: any) => id) : [],
        total: total,
        nextToken: nextToken,
        error,
        loading,
        loaded,
        refetch,
    };
};

export default useGetMainList;