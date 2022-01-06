import { ChevronLeft } from '@material-ui/icons';
import * as React from 'react';
import {
    Edit,
    EditProps,
    SimpleForm,
    required,
    useTranslate,
    TopToolbar,
    ListButton,
    TextInput,
    BooleanInput,
} from 'react-admin';
import { makeStyles } from '@material-ui/core';
import MyImageField from '../base/form/MyImageField';

const useStyles = makeStyles({
    width600: { width: 600 },
});

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
    const classes = useStyles(props);

    const transform = (data: any) => {
        return {
            ...data,
            is_public: data.is_public ? 1 : 0,
        }
    };

    return (
        <Edit
            {...props}
            undoable={false}
            title={<SlideTitle />}
            actions={<EditActions />}
            transform={transform}
        >
            <SimpleForm>

                <MyImageField {...props} source="image" />
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
        </Edit>
    )
};

export default SlideEdit;
