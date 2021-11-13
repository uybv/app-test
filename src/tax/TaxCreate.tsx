import * as React from 'react';
import {
    Create,
    CreateProps,
    SimpleForm,
    TextInput,
    useTranslate,
    NumberInput,
    required,
    minValue,
    maxValue
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const styles = {
    name: { width: 600 },
    value: { width: 200 },
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
