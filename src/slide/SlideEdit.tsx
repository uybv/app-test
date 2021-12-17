import { ChevronLeft } from '@material-ui/icons';
import * as React from 'react';
import {
    Edit,
    EditProps,
    SimpleForm,
    ImageInput,
    ImageField,
    required,
    useTranslate,
    TopToolbar,
    ListButton
} from 'react-admin';

const SlideTitle = (props: any) => {
    const { record } = props;
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.slide.name', { smart_count: 1 })} &quot;
            {record.name}&quot;
        </span>
    ) : null;
};

const EditActions = ({ basePath, data }: any) => (
    <TopToolbar>
        <ListButton basePath={basePath} icon={<ChevronLeft />} />
    </TopToolbar>
);

const SlideEdit = (props: EditProps) => {

    const [changeImage, setChangeImage] = React.useState(false);

    return (
        <Edit
            {...props}
            undoable={false}
            title={<SlideTitle />}
            actions={<EditActions />}
        >
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
