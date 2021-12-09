import * as React from 'react';
import {
    Edit,
    EditProps,
    FormTab,
    NumberInput,
    ImageInput,
    ImageField,
    required,
    TabbedForm,
    TextInput,
    ArrayInput,
    SimpleFormIterator,
    ReferenceArrayInput,
    AutocompleteArrayInput,
    minValue
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
    const [changeImage, setChangeImage] = React.useState(false);
    return (
        <Edit {...props} title={<ProductTitle />}>
            <TabbedForm>
                <FormTab
                    label="resources.product.tabs.image"
                    contentClassName={classes.tab}
                >
                    {!changeImage && (
                        <Poster />
                    )}
                    <ImageInput
                        source="images"
                        label="resources.product.fields.image"
                        accept="image/*"
                        maxSize={1000000}
                        onChange={() => {
                            setChangeImage(true)
                        }}
                    // validate={required()}
                    >
                        <ImageField source="src" title="title" />
                    </ImageInput>
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
                    <NumberInput
                        source="delivery_est"
                        step="10"
                        validate={[required(), minValue(0)]}
                        className={classes.width200}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    分
                                </InputAdornment>
                            ),
                        }}
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
                    <RichTextInput source="description" />
                </FormTab>
                <FormTab
                    label="resources.product.tabs.options"
                    path="options"
                >
                    <ArrayInput source="addition_prices" label="">
                        <SimpleFormIterator >
                            <TextInput source="name" validate={required()} />
                            <ArrayInput label="resources.product.fields.price" source="prices">
                                <SimpleFormIterator >
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
                    label="resources.product.tabs.information"
                    path="information"
                >
                    <ArrayInput source="information" label="">
                        <SimpleFormIterator >
                            <TextInput
                                label="resources.product.fields.information.item_title"
                                source="title" validate={required()}
                            />
                            <RichTextInput
                                label="resources.product.fields.information.item_content"
                                source="content" validate={required()} />
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

const requiredValidate = [required()];

export default ProductEdit;
