import * as React from 'react';
import {
    Edit,
    EditProps,
    FieldProps,
    SimpleForm,
    TextInput,
    useTranslate,
    ImageInput,
    ImageField,
    DateTimeInput,
    required,
    TopToolbar,
    ListButton,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { makeStyles } from '@material-ui/core/styles';
import { Category } from '../types';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from "date-fns/locale/ja";
import { ChevronLeft } from '@material-ui/icons';

export const styles = {
    title: { width: 600 },
};

const useStyles = makeStyles(styles);

const NewsTitle = (props: FieldProps<Category>) => {
    const { record } = props;
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.tax.name', { smart_count: 1 })} &quot;
            {record.title}&quot;
        </span>
    ) : null;
};

const EditActions = ({ basePath, data }: any) => (
    <TopToolbar>
        <ListButton basePath={basePath} icon={<ChevronLeft />} />
    </TopToolbar>
);

const NewsEdit = (props: EditProps) => {
    const classes = useStyles(props);

    const transform = (data: any) => ({
        ...data,
        publish_time: moment(data.publish_time).valueOf(),
        expired_time: moment(data.expired_time).valueOf(),
    });

    const [changeImage, setChangeImage] = React.useState(false);

    return (
        <Edit
            title={<NewsTitle />}
            undoable={false}
            actions={<EditActions />}
            transform={transform}
            {...props}
        >
            <SimpleForm>
                {!changeImage && (
                    <ImageField source="banner" title="title" />
                )}
                <ImageInput source="images"
                    label="resources.news.fields.banner"
                    accept="image/*"
                    maxSize={1000000}
                    validate={required()}
                    onChange={() => {
                        setChangeImage(true);
                    }}
                >
                    <ImageField source="src" title="title" />
                </ImageInput>
                <TextInput
                    autoFocus
                    source="title"
                    formClassName={classes.title}
                    validate={[required()]}
                />
                <DateTimeInput source="publish_time" provideroptions={{ utils: DateFnsUtils, locale: jaLocale }} />
                <DateTimeInput source="expired_time" provideroptions={{ utils: DateFnsUtils, locale: jaLocale }} />
                <RichTextInput source="content" />
            </SimpleForm>
        </Edit>
    );
};

export default NewsEdit;
