import * as React from 'react';
import {
    Create,
    CreateProps,
    TabbedForm,
    TextInput,
    FormTab,
    required,
    minValue,
    NumberInput,
    ReferenceArrayInput,
    AutocompleteArrayInput
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment } from '@material-ui/core';

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
            <TabbedForm >
                <FormTab label="resources.branch.tabs.info" path="info">
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
                        source="working_times.start"
                        type='time'
                        defaultValue={'08:00'}
                        validate={[required(), minValue(0)]}
                        className={classes.width200}
                        formClassName={classes.leftFormGroup}
                    />
                    <TextInput
                        source="working_times.end"
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
                        <AutocompleteArrayInput />
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
                </FormTab>
            </TabbedForm>
        </Create>
    );
};

export default BranchCreate;
