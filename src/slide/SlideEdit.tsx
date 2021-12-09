import * as React from 'react';
import {
    Edit,
    EditProps,
    SimpleForm,
    ImageInput,
    ImageField,
    required
} from 'react-admin';

const SlideEdit = (props: EditProps) => {

    const [changeImage, setChangeImage] = React.useState(false);

    return (
        <Edit title={""} {...props}>
            <SimpleForm>
                {!changeImage && (
                    <ImageField source="image" label={""} />
                )}
                <ImageInput source="images"
                    label="resources.slide.fields.image"
                    accept="image/*"
                    maxSize={1000000}
                    validate={required()}
                    onChange={() => {
                        setChangeImage(true);
                    }}
                >
                    <ImageField source="src" />
                </ImageInput>
            </SimpleForm>
        </Edit>
    )
};

export default SlideEdit;
