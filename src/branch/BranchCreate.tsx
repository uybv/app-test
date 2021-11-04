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
import { Typography, Box } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

export const styles = {
    name: { width: 600 },
    banner: { width: 600 },
    description: { width: 600 },
    location: { width: 600 },
    price: { width: '7em' },
    width: { width: '7em' },
    height: { width: '7em' },
    stock: { width: '7em' },
    widthFormGroup: { display: 'inline-block' },
    heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(styles);

const BranchCreate = (props: CreateProps) => {
    const classes = useStyles(props);

    return (
        <Create {...props}>
            <SimpleForm>
                <SectionTitle label="" />
                <ImageInput source="images" label="Banner" accept="image/*" maxSize={1000000} validate={required()}>
                    <ImageField source="src" title="title" />
                </ImageInput>
                <TextInput
                    autoFocus
                    source="name"
                    formClassName={classes.name}
                    validate={[required()]}
                />
                <NumberInput
                    source="location.x"
                    validate={required()}
                    className={classes.width}
                    formClassName={classes.widthFormGroup}
                    placeholder={'Latitude'}
                />
                <NumberInput
                    source="location.y"
                    validate={required()}
                    className={classes.height}
                    formClassName={classes.heightFormGroup}
                    placeholder={'Longitude'}
                />
                <TextInput
                    source="description"
                    formClassName={classes.description}
                    validate={[required()]}
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
