import * as React from 'react';
import { useEffect } from 'react';
import {
    Edit,
    EditProps,
    FieldProps,
    SimpleForm,
    TextInput,
    useTranslate,
    DateTimeInput,
    required,
    TopToolbar,
    ListButton,
    BooleanInput,
    Toolbar,
    SaveButton,
    DeleteButton,
    useRedirect,
    useNotify,
    usePermissions
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { makeStyles } from '@material-ui/core/styles';
import { Category } from '../types';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from "date-fns/locale/ja";
import { ChevronLeft } from '@material-ui/icons';
import FormControlImageField from '../base/form/FormControlImageField';

export const styles = {
    title: { width: 600 },
};

const useStyles = makeStyles(styles);

const NewsTitle = (props: FieldProps<Category>) => {
    const { record } = props;
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.news.name', { smart_count: 1 })} &quot;
            {record.title}&quot;
        </span>
    ) : null;
};

const EditActions = ({ basePath, data }: any) => (
    <TopToolbar>
        <ListButton basePath={basePath} icon={<ChevronLeft />} />
    </TopToolbar>
);

const EditToolbar = (props: any) => {
    const { record } = props;
    const useToolbarStyles = makeStyles({
        defaultToolbar: {
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
        },
    });
    const classes = useToolbarStyles();
    return (
        <Toolbar {...props} className={classes.defaultToolbar}>
            <SaveButton />
            <DeleteButton
                confirmTitle={`ニュース "${record?.title}"を削除`}
            />
        </Toolbar>
    );
};


const NewsEdit = (props: EditProps) => {
    const classes = useStyles(props);
    const redirect = useRedirect();
    const notify = useNotify();
    const { permissions } = usePermissions();

    useEffect(() => {
        if (permissions && permissions !== 'admin') {
            notify(`Permission Denied`);
            redirect('list');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [permissions]);

    const transform = (data: any) => ({
        ...data,
        publish_time: moment(data.publish_time).valueOf(),
        expired_time: moment(data.expired_time).valueOf(),
    });

    return (
        <Edit
            title={<NewsTitle />}
            undoable={false}
            actions={<EditActions />}
            transform={transform}
            {...props}
        >
            <SimpleForm toolbar={<EditToolbar />}>
                <FormControlImageField {...props} source="banner" />
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
        </Edit>
    );
};

export default NewsEdit;
