import * as React from 'react';
import {
    Datagrid,
    Edit,
    EditProps,
    EditButton,
    FieldProps,
    NumberField,
    ReferenceManyField,
    SimpleForm,
    TextInput,
    useTranslate,
    ImageField,
    NumberInput,
    ReferenceArrayInput,
    AutocompleteArrayInput,
    required
} from 'react-admin';

import ThumbnailField from '../products/ThumbnailField';
import ProductRefField from '../products/ProductRefField';
import { Typography, Box } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Category } from '../types';

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
                <ImageField source="banner" title="title" formClassName={classes.banner} />
                <TextInput source="name" formClassName={classes.name} validate={[required()]} />
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
                <ReferenceArrayInput
                    reference="product"
                    source="food_ids"
                    validate={required()}
                >
                    <AutocompleteArrayInput />
                </ReferenceArrayInput>
                <TextInput
                    source="description"
                    formClassName={classes.description}
                />
            </SimpleForm>
        </Edit>
    );
};

export default BranchEdit;
