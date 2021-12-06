import * as React from 'react';
import {
    Create,
    CreateProps,
    SimpleForm,
    TextInput,
    useTranslate,
    required,
    minValue,
    NumberInput,
    ReferenceArrayInput,
    AutocompleteArrayInput
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

export const styles = {
    width600: { width: 600 },
    width200: { width: 200 },
    leftFormGroup: { display: 'inline-block' },
    rightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(styles);

const BranchCreate = (props: CreateProps) => {
    const classes = useStyles(props);

    return (
        <Create {...props}>
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
        </Create>
    );
};

export default BranchCreate;
