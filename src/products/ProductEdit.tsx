import * as React from 'react';
import {
    Edit,
    EditProps,
    FormTab,
    NumberInput,
    ReferenceInput,
    required,
    TabbedForm,
    TextInput,
    ArrayInput,
    SimpleFormIterator,
    ReferenceArrayInput,
    AutocompleteArrayInput
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';

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
                    label="resources.product.tabs.image"
                    contentClassName={classes.tab}
                >
                    <Poster />
                </FormTab>
                <FormTab
                    label="resources.product.tabs.details"
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
                    <ReferenceArrayInput
                        reference="category"
                        source="cat_ids"
                        validate={required()}
                    >
                        <AutocompleteArrayInput />
                    </ReferenceArrayInput>
                    <ReferenceArrayInput
                        reference="tax"
                        source="tax_ids"
                        validate={required()}
                    >
                        <AutocompleteArrayInput />
                    </ReferenceArrayInput>
                </FormTab>
                <FormTab
                    label="resources.product.tabs.addition"
                    path="addition_prices"
                >
                    <ArrayInput source="addition_prices" label="">
                        <SimpleFormIterator disableRemove >
                            <TextInput source="name" validate={required()} />
                            <ArrayInput source="prices">
                                <SimpleFormIterator disableRemove >
                                    <TextInput
                                        source="name"
                                        validate={required()}
                                        className={classes.price}
                                        formClassName={classes.leftFormGroup}
                                    />
                                    <NumberInput
                                        source="price"
                                        validate={required()}
                                        className={classes.price}
                                        formClassName={classes.rightFormGroup}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    ¥
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>
                <FormTab
                    label="resources.product.tabs.description"
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
