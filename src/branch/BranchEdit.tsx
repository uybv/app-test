import * as React from 'react';
import {
    Edit,
    EditProps,
    FieldProps,
    SimpleForm,
    TextInput,
    useTranslate,
    NumberInput,
    ReferenceArrayInput,
    AutocompleteArrayInput,
    required,
    minValue
} from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';
import { Category } from '../types';

export const styles = {
    width600: { width: 600 },
    width200: { width: 200 },
    leftFormGroup: { display: 'inline-block' },
    rightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(styles);

const BranchTitle = (props: FieldProps<Category>) => {
    const { record } = props;
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.branch.name', { smart_count: 1 })} &quot;
            {record.name}&quot;
        </span>
    ) : null;
};

const BranchEdit = (props: EditProps) => {
    const classes = useStyles(props);

    return (
        <Edit title={<BranchTitle />} {...props}>
            <SimpleForm>
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
                <ReferenceArrayInput
                    className={classes.width600}
                    reference="product"
                    source="food_ids"
                >
                    <AutocompleteArrayInput />
                </ReferenceArrayInput>
                <ReferenceArrayInput
                    className={classes.width600}
                    reference="staff"
                    source="staff_ids"
                >
                    <AutocompleteArrayInput />
                </ReferenceArrayInput>
                <TextInput
                    source="description"
                    className={classes.width600}
                />
            </SimpleForm>
        </Edit>
    );
};

export default BranchEdit;
