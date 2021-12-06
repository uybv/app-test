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
    required
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { makeStyles } from '@material-ui/core/styles';
import { Category } from '../types';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from "date-fns/locale/ja";

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

const NewsEdit = (props: EditProps) => {
    const classes = useStyles(props);

    const tags: any[] = [
        { id: 'demo', name: 'demo' },
        { id: 'demo1', name: 'demo1' },
    ];
    const keywords: any[] = [
        { id: 'demo11', name: 'demo11' },
        { id: 'demo1', name: 'demo1' },
    ];

    const transform = (data: any) => ({
        ...data,
        publish_time: moment(data.publish_time).valueOf(),
        expired_time: moment(data.expired_time).valueOf(),
    });

    const [changeImage, setChangeImage] = React.useState(false);

    return (
        <Edit title={<NewsTitle />} transform={transform} {...props}>
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
                {/* <AutocompleteArrayInput
                    source="tags"
                    choices={tags}
                />
                <AutocompleteArrayInput
                    source="keywords"
                    choices={keywords}
                /> */}
            </SimpleForm>
        </Edit>
    );
};

export default NewsEdit;
