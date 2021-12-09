import * as React from 'react';
import {
    Create,
    CreateProps,
    SimpleForm,
    required,
    ImageInput,
    ImageField
} from 'react-admin';

const SlideCreate = (props: CreateProps) => {

    return (
        <Create {...props}>
            <SimpleForm>
                <ImageInput source="images"
                    label="resources.slide.fields.value"
                    accept="image/*"
                    maxSize={1000000}
                    validate={required()}
                >
                    <ImageField source="src"/>
                </ImageInput>
            </SimpleForm>
        </Create>
    );
};

export default SlideCreate;
