import * as React from 'react';
import {
    Edit,
    EditProps,
    FieldProps,
    SimpleForm,
    TextInput,
    useTranslate,
    NumberInput,
    required,
    minValue,
    maxValue,
    TopToolbar,
    ListButton
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft } from '@material-ui/icons';

export const styles = {
    name: { width: 600 },
    value: { width: 200 },
    description: { width: 600 },
};

const useStyles = makeStyles(styles);

const TaxTitle = (props: FieldProps<any>) => {
    const { record } = props;
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.tax.name', { smart_count: 1 })} &quot;
            {record.name}&quot;
        </span>
    ) : null;
};

const EditActions = ({ basePath, data }: any) => (
    <TopToolbar>
        <ListButton basePath={basePath} icon={<ChevronLeft />} />
    </TopToolbar>
);

const TaxEdit = (props: EditProps) => {
    const classes = useStyles(props);

    return (
        <Edit
            title={<TaxTitle />}
            {...props}
            undoable={false}
            actions={<EditActions />}
        >
            <SimpleForm>
                <TextInput
                    source="name"
                    className={classes.name}
                    validate={[required()]}
                />
                <NumberInput
                    source="value"
                    validate={[required(), minValue(0), maxValue(100)]}
                    className={classes.value}
                    min="0"
                    max="100"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                %
                            </InputAdornment>
                        ),
                    }}
                />
                <TextInput
                    source="description"
                    className={classes.description}
                />
                {/* <ReferenceManyField
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
                </ReferenceManyField> */}
            </SimpleForm>
        </Edit>
    );
};

export default TaxEdit;
