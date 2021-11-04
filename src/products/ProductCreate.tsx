import * as React from 'react';
import {
    Create,
    FormTab,
    NumberInput,
    ReferenceInput,
    SelectInput,
    TabbedForm,
    TextInput,
    required,
    CreateProps,
    ImageInput,
    ImageField
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';

export const styles = {
    price: { width: '7em' },
    width: { width: '7em' },
    height: { width: '7em' },
    stock: { width: '7em' },
    widthFormGroup: { display: 'inline-block' },
    heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(styles);

const ProductCreate = (props: CreateProps) => {
    const classes = useStyles();
    return (
        <Create {...props}>
            <TabbedForm>
                <FormTab label="resources.products.tabs.image">
                    <ImageInput source="images" label="Image" accept="image/*" maxSize={1000000} validate={required()}>
                        <ImageField source="src" title="title" />
                    </ImageInput>
                </FormTab>
                <FormTab label="resources.products.tabs.details" path="details">
                    <TextInput source="name" validate={required()} />
                    <NumberInput
                        source="price"
                        validate={required()}
                        className={classes.price}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    ¥
                                </InputAdornment>
                            ),
                        }}
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
                        validate={required()}
                        className={classes.stock}
                    />
                </FormTab>
                <FormTab
                    label="resources.products.tabs.description"
                    path="description"
                >
                    <RichTextInput source="description" label="" />
                </FormTab>
            </TabbedForm>
        </Create>
    );
};

export default ProductCreate;
