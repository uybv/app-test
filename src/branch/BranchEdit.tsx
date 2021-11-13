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
                <TextInput source="name" className={classes.name} validate={[required()]} />
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
                    validate={required()}
                >
                    <AutocompleteArrayInput />
                </ReferenceArrayInput>
                <TextInput
                    source="description"
                    className={classes.description}
                />
            </SimpleForm>
        </Edit>
    );
};

export default BranchEdit;
