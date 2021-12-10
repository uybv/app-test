import * as React from 'react';
import {
    Create,
    FormTab,
    NumberInput,
    minValue,
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
    width200: { width: 200 },
    leftFormGroup: { display: 'inline-block' },
    rightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(styles);

const ProductCreate = (props: CreateProps) => {
    const classes = useStyles();

    const transform = (data: any) => {
        return {
            ...data,
            delivery_est: data.delivery_est * 60 * 1000,
        }
    };

    return (
        <Create {...props} transform={transform}>
            <TabbedForm>
                <FormTab label="resources.product.tabs.image">
                    <ImageInput
                        source="images"
                        label="resources.product.fields.image"
                        accept="image/*"
                        maxSize={1000000}
                        validate={required()}
                    >
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
                    <ArrayInput source="addition_prices" label="" defaultValue={[{ name: '', prices: [{ name: '', price: 0 }, { name: '', price: 0 }, { name: '', price: 0 }] }]}>
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
                    <ArrayInput source="information" label="" defaultValue={[{ title: '', content: '' }]}>
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
        </Create>
    );
};

export default ProductCreate;
