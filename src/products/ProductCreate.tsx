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
    ImageField,
    ArrayInput,
    ReferenceArrayInput,
    AutocompleteArrayInput,
    SimpleFormIterator
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';

export const styles = {
    price: { width: '7em' },
    leftFormGroup: { display: 'inline-block' },
    rightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(styles);

const ProductCreate = (props: CreateProps) => {
    const classes = useStyles();
    return (
        <Create {...props}>
            <TabbedForm>
                <FormTab label="resources.product.tabs.image">
                    <ImageInput source="images" label="Image" accept="image/*" maxSize={1000000} validate={required()}>
                        <ImageField source="src" title="title" />
                    </ImageInput>
                </FormTab>
                <FormTab label="resources.product.tabs.details" path="details">
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
                >
                    <RichTextInput source="description" label="" />
                </FormTab>
            </TabbedForm>
        </Create>
    );
};

export default ProductCreate;
