import * as React from 'react';
import { useEffect } from 'react';
import {
    Create,
    NumberInput,
    minValue,
    SelectInput,
    SimpleForm,
    TextInput,
    required,
    CreateProps,
    ImageInput,
    ImageField,
    ArrayInput,
    ReferenceInput,
    SimpleFormIterator,
    useRedirect,
    useNotify,
    usePermissions
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

    const transform = (data: any) => {
        return {
            ...data,
            delivery_est: data.delivery_est * 60 * 1000,
            cat_ids: [data.cat_ids],
            tax_ids: [data.tax_ids],
        }
    };

    return (
        <Create {...props} transform={transform}>
            <SimpleForm redirect="list">
                <ImageInput
                    source="images"
                    label="resources.product.fields.image"
                    accept="image/*"
                    maxSize={1000000}
                >
                    <ImageField source="src" title="title" />
                </ImageInput>
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
                    defaultValue={0}
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
                <ReferenceInput
                    reference="category"
                    source="cat_ids"
                    validate={required()}
                >
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <ReferenceInput
                    reference="tax"
                    source="tax_ids"
                    validate={required()}
                >
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <RichTextInput source="description" />
                <ArrayInput source="information" label="商品情報">
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
                <ArrayInput source="addition_prices" label="オプション">
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
                                    defaultValue={0}
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
            </SimpleForm>
        </Create>
    );
};

export default ProductCreate;
