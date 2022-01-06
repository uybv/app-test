import { makeStyles } from '@material-ui/core';
import * as React from 'react';
import {
    Create,
    CreateProps,
    SimpleForm,
    required,
    ImageInput,
    ImageField,
    TextInput,
    BooleanInput
} from 'react-admin';

const useStyles = makeStyles({
    width600: { width: 600 },
});

const SlideCreate = (props: CreateProps) => {
    const classes = useStyles(props);

    const transform = (data: any) => {
        return {
            ...data,
            is_public: data.is_public ? 1 : 0,
        }
    };

    return (
        <Create {...props} transform={transform}>
            <SimpleForm redirect="list">
                <ImageInput source="images"
                    label="resources.slide.fields.image"
                    accept="image/*"
                    maxSize={1000000}
                >
                    <ImageField source="src" />
                </ImageInput>
                <TextInput
                    source="title"
                    label="タイトル"
                    formClassName={classes.width600}
                    validate={[required()]}
                />
                <TextInput
                    source="url"
                    label="URL"
                    formClassName={classes.width600}
                />
                <BooleanInput label="有効" source="is_public" defaultValue={true} />
            </SimpleForm>
        </Create>
    );
};

export default SlideCreate;
