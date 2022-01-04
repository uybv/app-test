import * as React from 'react';
import {
    Edit,
    EditProps,
    SimpleForm,
    NumberInput,
    ImageInput,
    ImageField,
    required,
    TextInput,
    ArrayInput,
    SimpleFormIterator,
    ReferenceArrayInput,
    SelectInput,
    minValue,
    useTranslate,
    TopToolbar,
    ListButton
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';

import Poster from './Poster';
import { styles as createStyles } from './ProductCreate';
import { Product } from '../types';
import { ChevronLeft } from '@material-ui/icons';

interface ProductTitleProps {
    record?: Product;
}

const ProductTitle = ({ record }: ProductTitleProps) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.product.name', { smart_count: 1 })} &quot;
            {record.name}&quot;
        </span>
    ) : null;
}

const useStyles = makeStyles({
    ...createStyles,
    tab: {
        maxWidth: '40em',
        display: 'block',
    },
});

const EditActions = ({ basePath, data }: any) => (
    <TopToolbar>
        <ListButton basePath={basePath} icon={<ChevronLeft />} />
    </TopToolbar>
);

const ProductEdit = (props: EditProps) => {
    const classes = useStyles();
    const [changeImage, setChangeImage] = React.useState(false);

    const transform = (data: any) => {
        return {
            ...data,
            delivery_est: data.delivery_est * 60 * 1000,
            cat_ids: [data.cat_ids],
            tax_ids: [data.tax_ids],
        }
    };

    return (
        <Edit
            {...props}
            title={<ProductTitle />}
            undoable={false}
            actions={<EditActions />}
            transform={transform}
        >
            <SimpleForm>
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
                >
                    <ImageField source="src" title="title" />
                </ImageInput>

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
                    <SelectInput optionText="name" />
                </ReferenceArrayInput>
                <ReferenceArrayInput
                    reference="tax"
                    source="tax_ids"
                    validate={required()}
                >
                    <SelectInput optionText="name" />
                </ReferenceArrayInput>
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
        </Edit>
    );
};

const requiredValidate = [required()];

export default ProductEdit;
