import * as React from 'react';
import {
    Create,
    CreateProps,
    SimpleForm,
    TextInput,
    useTranslate,
    required,
    ImageInput,
    ImageField
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

export const styles: Styles<Theme, any> = {
    name: { width: 544 },
    banner: { width: 544 },
    description: { width: 544 },
};

const useStyles = makeStyles(styles);

const CategoryCreate = (props: CreateProps) => {
    const classes = useStyles(props);

    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput
                    autoFocus
                    source="name"
                    formClassName={classes.name}
                    validate={requiredValidate}
                />
                <TextInput
                    source="description"
                    formClassName={classes.description}
                />
            </SimpleForm>
        </Create>
    );
};

const requiredValidate = [required()];

const SectionTitle = ({ label }: { label: string }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(label)}
        </Typography>
    );
};

export default CategoryCreate;
