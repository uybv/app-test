import * as React from 'react';
import { useEffect } from 'react';
import { Box, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    CreateButton,
    FilterButton,
    InputProps,
    ListBase,
    ListProps,
    SearchInput,
    Title,
    TopToolbar,
    useListContext,
    useTranslate,
    ListToolbar,
    useRedirect,
    useNotify,
    usePermissions
} from 'react-admin';

import GridList from './GridList';
import PrevNextPagination from '../base/list/PrevNextPagination';
import MyList from '../base/list/MyList';

export const productFilters = [
    <SearchInput source="q" alwaysOn />,
];

const ListActions = ({ isSmall }: any) => (
    <TopToolbar>
        {isSmall && <FilterButton />}
        <CreateButton basePath="/product" />
    </TopToolbar>
);

const ProductList = (props: ListProps) => {
    const redirect = useRedirect();
    const notify = useNotify();
    const { permissions } = usePermissions();

    useEffect(() => {
        if (permissions && permissions !== 'admin') {
            notify(`Permission Denied`);
            redirect('list');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [permissions]);

    return (
        <MyList
            {...props}
            perPage={50}
            pagination={<PrevNextPagination />}
            component="div"
            filters={productFilters}
            actions={<ListActions />}
        >
            <GridList />
        </MyList>
    );
};

export default ProductList;
