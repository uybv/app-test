import * as React from 'react';
import {
    Edit,
    EditProps,
    FieldProps,
    SimpleForm,
    TextInput,
    useTranslate,
    NumberInput,
    ReferenceManyField,
    NumberField,
    Datagrid,
    EditButton,
    required
} from 'react-admin';

import ThumbnailField from '../products/ThumbnailField';
import ProductRefField from '../products/ProductRefField';

import { makeStyles } from '@material-ui/core/styles';
import { Category } from '../types';

export const styles = {
    name: { width: 600 },
    value: { width: 600 },
    description: { width: 600 },
};

const useStyles = makeStyles(styles);

const TaxTitle = (props: FieldProps<Category>) => {
    const { record } = props;
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.tax.name', { smart_count: 1 })} &quot;
            {record.name}&quot;
        </span>
    ) : null;
};

const TaxEdit = (props: EditProps) => {
    const classes = useStyles(props);

    return (
        <Edit title={<TaxTitle />} {...props}>
            <SimpleForm>
                <TextInput
                    source="name"
                    formClassName={classes.name}
                    validate={[required()]}
                />
                <NumberInput
                    source="value"
                    validate={required()}
                    formClassName={classes.value}
                />
                <TextInput
                    source="description"
                    formClassName={classes.description}
                />
                <ReferenceManyField
                    reference="product"
                    target="tax_ids"
                    label="resources.branch.fields.products"
                    perPage={20}
                    fullWidth
                >
                    <Datagrid>
                        <ThumbnailField source="image" />
                        <ProductRefField source="name" />
                        <NumberField
                            source="price"
                            options={{ style: 'currency', currency: 'USD' }}
                        />
                        <NumberField
                            source="width"
                            options={{ minimumFractionDigits: 2 }}
                        />
                        <NumberField
                            source="height"
                            options={{ minimumFractionDigits: 2 }}
                        />
                        <NumberField source="stock" />
                        <NumberField source="sales" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </SimpleForm>
        </Edit>
    );
};

export default TaxEdit;
