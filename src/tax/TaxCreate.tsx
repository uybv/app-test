import * as React from 'react';
import {
    Create,
    CreateProps,
    SimpleForm,
    TextInput,
    useTranslate,
    required,
    ImageInput,
    ImageField,
    NumberInput
} from 'react-admin';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const styles = {
    name: { width: 600 },
    value: { width: 600 },
    description: { width: 600 },
};

const useStyles = makeStyles(styles);

const TaxCreate = (props: CreateProps) => {
    const classes = useStyles(props);

    return (
        <Create {...props}>
            <SimpleForm>
                <SectionTitle label="" />
                <TextInput
                    autoFocus
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

export default TaxCreate;
