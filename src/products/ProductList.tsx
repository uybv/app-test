import * as React from 'react';
import { Box, Chip, useMediaQuery, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    CreateButton,
    ExportButton,
    FilterButton,
    FilterForm,
    FilterContext,
    InputProps,
    ListBase,
    ListProps,
    NumberInput,
    Pagination,
    ReferenceInput,
    SearchInput,
    SelectInput,
    SortButton,
    Title,
    TopToolbar,
    useListContext,
    useTranslate,
    ListToolbar
} from 'react-admin';

import GridList from './GridList';
import Aside from './Aside';

const useQuickFilterStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(1),
    },
}));

const QuickFilter = ({ label }: InputProps) => {
    const translate = useTranslate();
    const classes = useQuickFilterStyles();
    return <Chip className={classes.root} label={translate(label)} />;
};

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
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    return (
        <ListBase
            perPage={50}
            sort={{ field: 'reference', order: 'ASC' }}
            {...props}
        >
            <ListToolbar
                filters={productFilters}
                actions={<ListActions/>}
            />
            <ProductListView isSmall={isSmall} />
        </ListBase>
    );
};

const ProductListView = ({ isSmall }: { isSmall: boolean }) => {
    const { defaultTitle } = useListContext();
    return (
        <>
            <Title defaultTitle={defaultTitle} />
            <Box display="flex">
                {/* <Aside /> */}
                <Box width={'100%'}>
                    <GridList />
                    <Pagination rowsPerPageOptions={[50]} />
                </Box>
            </Box>
        </>
    );
};
export default ProductList;
