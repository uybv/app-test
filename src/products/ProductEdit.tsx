import * as React from 'react';
import {
    Datagrid,
    DateField,
    Edit,
    EditButton,
    EditProps,
    FormTab,
    NumberInput,
    Pagination,
    ReferenceInput,
    ReferenceManyField,
    required,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput,
    ImageInput,
    ImageField
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';

import CustomerReferenceField from '../visitors/CustomerReferenceField';
import Poster from './Poster';
import { styles as createStyles } from './ProductCreate';
import { Product } from '../types';

interface ProductTitleProps {
    record?: Product;
}

const ProductTitle = ({ record }: ProductTitleProps) =>
    record ? <span>Poster #{record.reference}</span> : null;

const useStyles = makeStyles({
    ...createStyles,
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    tab: {
        maxWidth: '40em',
        display: 'block',
    },
});

const ProductEdit = (props: EditProps) => {
    const classes = useStyles();
    return (
        <Edit {...props} title={<ProductTitle />}>
            <TabbedForm>
                <FormTab
                    label="resources.products.tabs.image"
                    contentClassName={classes.tab}
                >
                    <Poster />
                </FormTab>
                <FormTab
                    label="resources.products.tabs.details"
                    path="details"
                    contentClassName={classes.tab}
                >
                    <TextInput source="name" validate={requiredValidate} />
                    <NumberInput
                        source="price"
                        className={classes.price}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    ¥
                                </InputAdornment>
                            ),
                        }}
                        validate={requiredValidate}
                    />
                    <ReferenceInput
                        source="cat_ids"
                        reference="category"
                        validate={required()}
                        
                    >
                        <SelectInput source="name" />
                    </ReferenceInput>
                    <ReferenceInput
                        source="tax_ids"
                        reference="tax"
                        validate={required()}
                    >
                        <SelectInput source="name" />
                    </ReferenceInput>
                    <NumberInput
                        source="stock"
                        className={classes.stock}
                        validate={requiredValidate}
                    />
                    <NumberInput
                        source="sales"
                        className={classes.stock}
                        validate={requiredValidate}
                    />
                </FormTab>
                <FormTab
                    label="resources.products.tabs.description"
                    path="description"
                    contentClassName={classes.tab}
                >
                    <RichTextInput
                        source="description"
                        label=""
                        validate={requiredValidate}
                    />
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

const requiredValidate = [required()];

export default ProductEdit;
