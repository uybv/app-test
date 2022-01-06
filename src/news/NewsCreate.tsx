import * as React from 'react';
import {
    Create,
    CreateProps,
    SimpleForm,
    TextInput,
    required,
    DateTimeInput,
    ImageInput,
    ImageField,
    BooleanInput
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from "date-fns/locale/ja";

const useStyles = makeStyles({
    title: { width: 600 },
});

const NewsCreate = (props: CreateProps) => {
    const classes = useStyles(props);

    const transform = (data: any) => ({
        ...data,
        publish_time: moment(data.publish_time).valueOf(),
        expired_time: moment(data.expired_time).valueOf(),
    });

    return (
        <Create {...props} transform={transform}>
            <SimpleForm redirect="list">
                <ImageInput source="images"
                    label="resources.news.fields.banner"
                    accept="image/*"
                    maxSize={1000000}
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
                <BooleanInput label="有効" source="is_public" defaultValue={true} />
            </SimpleForm>
        </Create>
    );
};

export default NewsCreate;
