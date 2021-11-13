import * as React from 'react';
import {
    Create,
    CreateProps,
    SimpleForm,
    TextInput,
    useTranslate,
    required,
    minValue,
    maxValue,
    NumberInput,
    ReferenceArrayInput,
    AutocompleteArrayInput
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

export const styles = {
    name: { width: 600 },
    banner: { width: 600 },
    description: { width: 600 },
    location: { width: 600 },
    food: { width: 600 },
    width: { width: 200 },
    height: { width: 200 },
    widthFormGroup: { display: 'inline-block' },
    heightFormGroup: { display: 'inline-block', marginLeft: 32 },
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
                    className={classes.name}
                    validate={[required()]}
                />
                <NumberInput
                    source="location.x"
                    validate={[required(), minValue(0)]}
                    className={classes.width}
                    formClassName={classes.widthFormGroup}
                    placeholder={'Latitude'}
                />
                <NumberInput
                    source="location.y"
                    validate={[required(), minValue(0)]}
                    className={classes.height}
                    formClassName={classes.heightFormGroup}
                    placeholder={'Longitude'}
                />
                <ReferenceArrayInput
                    className={classes.food}
                    reference="product"
                    source="food_ids"
                >
                    <AutocompleteArrayInput />
                </ReferenceArrayInput>
                <TextInput
                    source="description"
                    className={classes.description}
                />
            </SimpleForm>
        </Create>
    );
};

const SectionTitle = ({ label }: { label: string }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(label)}
        </Typography>
    );
};

export default BranchCreate;
