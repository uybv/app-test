import * as React from 'react';
import {
    Edit,
    EditProps,
    FieldProps,
    TabbedForm,
    FormTab,
    TextInput,
    useTranslate,
    NumberInput,
    ReferenceArrayInput,
    AutocompleteArrayInput,
    ReferenceArrayField,
    NumberField,
    Datagrid,
    required,
    minValue,
    ArrayInput,
    SimpleFormIterator,
    FormDataConsumer,
    BooleanInput,
    TopToolbar,
    ListButton,
    Toolbar,
    SaveButton,
    DeleteButton,
    TextField
} from 'react-admin';
import {
    Button,
    InputAdornment,
} from '@material-ui/core';
import QRCode from 'qrcode.react';
import { apiBaseUrl } from '../config';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft, CloudDownload } from '@material-ui/icons';
import ThumbnailField from '../products/ThumbnailField';
import ContentCreate from '@material-ui/icons/Create';
import _ from 'lodash';
import { getDayOfWeek, minWorkingTime, styles, transform } from './BranchCreate';

let branchId = '';

const QrCodeField = (props: any) => {
    const { record } = props;
    if (!record) return null;
    return (
        <QRCode id={record.id} size={150} value={apiBaseUrl + "/app/qr/?type=food-branch&food_id=" + record.id + "&branch_id=" + branchId} />
    );
};

const QrCodeDownloadButton = (props: any) => {
    const { record } = props;
    if (!record) return null;
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<CloudDownload />}
                onClick={() => {
                    const canvas = document.getElementById(record.id) as any;
                    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
                    let downloadLink = document.createElement('a');
                    downloadLink.href = pngUrl;
                    downloadLink.download = 'foo_branch_' + record.id + '.png';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                }}
            >
                ＱＲコードのダウンロード
            </Button>
            <div style={{ display: "none" }}>
                <QrCodeField  {...props} />
            </div>
        </>
    );
};

const useStyles = makeStyles(styles);

const BranchTitle = (props: FieldProps<any>) => {
    const { record } = props;
    const translate = useTranslate();
    if (record) {
        branchId = record.id;
    }
    return record ? (
        <span>
            {translate('resources.branch.name', { smart_count: 1 })} &quot;
            {record.name}&quot;
        </span>
    ) : null;
};

const EditActions = ({ basePath, data }: any) => (
    <TopToolbar>
        <ListButton basePath={basePath} icon={<ChevronLeft />} />
    </TopToolbar>
);

const EditToolbar = (props: any) => {
    const { isTabMenuFood, isEditMenuFood } = props;
    const useToolbarStyles = makeStyles({
        defaultToolbar: {
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
        },
    });
    const classes = useToolbarStyles();
    return (isEditMenuFood || !isTabMenuFood) ? (
        <Toolbar {...props} className={classes.defaultToolbar}>
            <SaveButton />
            {!isTabMenuFood && (<DeleteButton />)}
        </Toolbar>
    ) : null;
};

const BranchEdit = (props: EditProps) => {
    const classes = useStyles(props);

    const url = window.location.href;
    const [isEditMenuFood, setIsEditMenuFood] = React.useState<boolean>(false);
    const [isTabMenuFood, setIsTabMenuFood] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (url) {
            const urlParse = window.location.href.split('/');
            setIsTabMenuFood(urlParse[urlParse.length - 1] === 'menu-food');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return (
        <Edit
            {...props}
            title={<BranchTitle />}
            undoable={false}
            actions={<EditActions />}
            transform={transform}>
            <TabbedForm toolbar={<EditToolbar {...props} isEditMenuFood={isEditMenuFood} isTabMenuFood={isTabMenuFood} />}>
                <FormTab label="resources.branch.tabs.info">
                    <TextInput
                        autoFocus
                        source="name"
                        className={classes.width600}
                        validate={[required()]}
                    />
                    <TextInput
                        autoFocus
                        source="address.postal_code"
                        className={classes.width600}
                        validate={[required()]}
                    />
                    <TextInput
                        autoFocus
                        source="address.address"
                        className={classes.width600}
                        validate={[required()]}
                    />
                    <TextInput
                        autoFocus
                        source="working_time_text"
                        className={classes.width600}
                        validate={[required()]}
                    />
                    <TextInput
                        autoFocus
                        source="holiday_text"
                        className={classes.width600}
                        validate={[required()]}
                    />
                    <NumberInput
                        source="address.location.x"
                        validate={[required(), minValue(0)]}
                        className={classes.width200}
                        formClassName={classes.displayInlineBlock}
                    />
                    <NumberInput
                        source="address.location.y"
                        validate={[required(), minValue(0)]}
                        className={classes.width200}
                        formClassName={classes.displayInlineBlock}
                    />
                    <NumberInput
                        source="delivery_est"
                        step="10"
                        validate={[required(), minValue(0)]}
                        className={classes.width200}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    分
                                </InputAdornment>
                            ),
                        }}
                    />
                    <ReferenceArrayInput
                        className={classes.width600}
                        reference="staff"
                        source="staff_ids"
                    >
                        <AutocompleteArrayInput optionText="username" />
                    </ReferenceArrayInput>
                    <ArrayInput source="working_times" label="営業時間">
                        <SimpleFormIterator getItemLabel={(index) => ''}
                            disableRemove disableAdd disableReordering >
                            <FormDataConsumer>
                                {({
                                    formData, // The whole form data
                                    scopedFormData, // The data for this item of the ArrayInput
                                    getSource, // A function to get the valid source inside an ArrayInput
                                    ...props
                                }) =>
                                    scopedFormData && !_.isUndefined(getSource) ? (
                                        <div style={{ display: 'flex', alignItems: 'center', minHeight: 85 }}>
                                            <span style={{ marginLeft: 15, marginRight: 15 }}>
                                                {
                                                    getDayOfWeek((props as any).id.substring(
                                                        (props as any).id.indexOf("[") + 1,
                                                        (props as any).id.lastIndexOf("]")))
                                                }
                                            </span>
                                            <BooleanInput
                                                source={getSource('not_holiday')}
                                                label=""
                                                className={classes.inputHoliday}
                                                style={{ flexDirection: 'unset', flexWrap: 'unset' }}
                                            />
                                            <span style={{ marginLeft: 15, width: 70, marginRight: 15 }}>{!scopedFormData.not_holiday ? '定休日' : '開く'}</span>
                                            {scopedFormData.not_holiday && (
                                                <>
                                                    <TextInput
                                                        label=""
                                                        source={getSource('start_at')} // Will translate to "working_times[0].start_at"
                                                        type='time'
                                                        defaultValue={'08:00'}
                                                        validate={[required(), minValue(0)]}
                                                        className={classes.inputTime}
                                                    />
                                                    <TextInput
                                                        label=""
                                                        source={getSource('end_at')} // Will translate to "working_times[0].end_at"
                                                        type='time'
                                                        defaultValue={'18:00'}
                                                        validate={[required(), minWorkingTime()]}
                                                        className={classes.inputTime}
                                                    />
                                                </>
                                            )}

                                        </div>
                                    ) : null
                                }
                            </FormDataConsumer>
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>
                <FormTab label="resources.branch.tabs.menu" path="menu-food">
                    {isEditMenuFood ? (
                        <>
                            <>
                                <Button
                                    variant={'outlined'}
                                    type={'button'}
                                    color={'default'}
                                    startIcon={<ChevronLeft />}
                                    onClick={() => { setIsEditMenuFood(false) }}
                                >
                                    戻る
                                </Button>
                            </>
                            <ReferenceArrayInput
                                className={classes.width600}
                                reference="product"
                                source="food_ids"
                                label="商品一覧（メニュー）"
                            >
                                <AutocompleteArrayInput />
                            </ReferenceArrayInput>
                        </>
                    ) : (
                        <>
                            <>
                                <Button
                                    variant={'text'}
                                    type={'button'}
                                    color={'primary'}
                                    startIcon={<ContentCreate />}
                                    onClick={() => { setIsEditMenuFood(true) }}
                                >
                                    編集
                                </Button>
                            </>

                            <ReferenceArrayField
                                filter={{}}
                                reference="product"
                                source="food_ids"
                                label="商品一覧（メニュー）"
                                perPage={100}
                                fullWidth
                            >
                                <Datagrid>
                                    <ThumbnailField />
                                    <TextField source="name" />
                                    <NumberField
                                        source="price"
                                        options={{ style: 'currency', currency: 'JPY' }}
                                    />
                                    <QrCodeDownloadButton />
                                </Datagrid>
                            </ReferenceArrayField>

                        </>
                    )}
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

export default BranchEdit;
