import * as React from 'react';
import {
    Edit,
    EditProps,
    FieldProps,
    TabbedForm,
    FormTab,
    TextInput,
    useTranslate,
    NumberInput,
    ReferenceArrayInput,
    AutocompleteArrayInput,
    ReferenceArrayField,
    NumberField,
    Datagrid,
    required,
    minValue
} from 'react-admin';
import QRCode from 'qrcode.react';
import { apiBaseUrl } from '../config';

import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment } from '@material-ui/core';
import ProductRefField from '../products/ProductRefField';

export const styles = {
    width600: { width: 600 },
    width200: { width: 200 },
    leftFormGroup: { display: 'inline-block' },
    rightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

let branchId = '';

const QrCodeField = (props: any) => {
    const { record } = props;
    if (!record) return null;
    return (
        <QRCode size={120} value={apiBaseUrl + "/app/qr/?type=food-branch&food_id=" + record.id + "&branch_id=" + branchId} />
    );
};

const useStyles = makeStyles(styles);

const BranchTitle = (props: FieldProps<any>) => {
    const { record } = props;
    const translate = useTranslate();
    if (record) {
        branchId = record.id;
    }
    return record ? (
        <span>
            {translate('resources.branch.name', { smart_count: 1 })} &quot;
            {record.name}&quot;
        </span>
    ) : null;
};

const BranchEdit = (props: EditProps) => {
    const classes = useStyles(props);

    const transform = (data: any) => {
        const start = data.working_times.start_at.split(":");
        const end = data.working_times.end_at.split(":");
        return {
            ...data,
            working_times: {
                start_at: (start[0] * 60 * 60 * 1000) + (start[1] * 60 * 1000),
                end_at: (end[0] * 60 * 60 * 1000) + (end[1] * 60 * 1000),
            },
            delivery_est: data.delivery_est * 60 * 1000,
        }
    };

    return (
        <Edit title={<BranchTitle />} {...props} transform={transform}>
            <TabbedForm >
                <FormTab label="resources.branch.tabs.info">
                    <TextInput
                        autoFocus
                        source="name"
                        className={classes.width600}
                        validate={[required()]}
                    />
                    <TextInput
                        autoFocus
                        source="address.postal_code"
                        className={classes.width600}
                        validate={[required()]}
                    />
                    <TextInput
                        autoFocus
                        source="address.address"
                        className={classes.width600}
                        validate={[required()]}
                    />
                    <NumberInput
                        source="address.location.x"
                        validate={[required(), minValue(0)]}
                        className={classes.width200}
                        formClassName={classes.leftFormGroup}
                    />
                    <NumberInput
                        source="address.location.y"
                        validate={[required(), minValue(0)]}
                        className={classes.width200}
                        formClassName={classes.rightFormGroup}
                    />
                    <></>
                    <TextInput
                        source="working_times.start_at"
                        type='time'
                        defaultValue={'08:00'}
                        validate={[required(), minValue(0)]}
                        className={classes.width200}
                        formClassName={classes.leftFormGroup}
                    />
                    <TextInput
                        source="working_times.end_at"
                        type='time'
                        defaultValue={'18:00'}
                        validate={[required(), minValue(0)]}
                        className={classes.width200}
                        formClassName={classes.rightFormGroup}
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
                        className={classes.width600}
                        reference="staff"
                        source="staff_ids"
                    >
                        <AutocompleteArrayInput  optionText="username" />
                    </ReferenceArrayInput>
                    <TextInput
                        source="description"
                        className={classes.width600}
                    />
                </FormTab>
                <FormTab label="resources.branch.tabs.menu" path="menu-food">
                    <ReferenceArrayInput
                        className={classes.width600}
                        reference="product"
                        source="food_ids"
                    >
                        <AutocompleteArrayInput />
                    </ReferenceArrayInput>
                    <ReferenceArrayField
                        filter={{}}
                        reference="product"
                        source="food_ids"
                        label=""
                        perPage={20}
                        fullWidth
                    >
                        <Datagrid>
                            <QrCodeField />
                            <ProductRefField source="name" />
                            <NumberField
                                source="price"
                                options={{ style: 'currency', currency: 'JPY' }}
                            />
                        </Datagrid>
                    </ReferenceArrayField>
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

export default BranchEdit;
