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
    AutocompleteArrayInput,
    ReferenceArrayInput
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';
import CreateTag from './CreateTag';
import CreateKeyword from './CreateKeyword';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from "date-fns/locale/ja";

export const styles = {
    title: { width: 600 },
};

const useStyles = makeStyles(styles);

const NewsCreate = (props: CreateProps) => {
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

    return (
        <Create {...props} transform={transform}>
            <SimpleForm>
                <ImageInput source="images"
                    label="Banner"
                    accept="image/*"
                    maxSize={1000000}
                // validate={required()}
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
        </Create>
    );
};

export default NewsCreate;
