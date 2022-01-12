/* eslint-disable react-hooks/rules-of-hooks */
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
    useRedirect,
    useNotify,
    useRefresh,
    usePermissions
} from 'react-admin';
import {
    Button,
    InputAdornment,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft } from '@material-ui/icons';
import ContentCreate from '@material-ui/icons/Create';
import _ from 'lodash';
import { getDayOfWeek, minWorkingTime, styles, transform } from './BranchCreate';
import BranchMenuFoodField from './BranchMenuFoodField';


const useStyles = makeStyles(styles);

const BranchTitle = (props: FieldProps<any>) => {
    const { record } = props;
    const translate = useTranslate();
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
    const { isTabMenuFood, isEditMenuFood, setIsEditMenuFood, record } = props;
    const notify = useNotify();
    const refresh = useRefresh();
    const useToolbarStyles = makeStyles({
        defaultToolbar: {
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
        },
    });
    const classes = useToolbarStyles();
    return !isTabMenuFood ? (
        <Toolbar {...props} className={classes.defaultToolbar}>
            <SaveButton
                transform={(data) => {
                    delete data.food_ids;
                    return data;
                }}
            />
            <DeleteButton confirmTitle={`店舗管理 "${record?.name}"を削除`} />)
        </Toolbar>
    ) : isEditMenuFood ? (
        <Toolbar {...props} className={classes.defaultToolbar}>
            <SaveButton
                transform={data => ({ food_ids: data.food_ids })}
                onSuccess={(response: any) => {
                    setIsEditMenuFood(false);
                    notify(`更新しました`);
                    refresh();
                }}
            />
        </Toolbar>
    ) : null;
};

const BranchEdit = (props: EditProps) => {
    const classes = useStyles(props);
    const redirect = useRedirect();
    const notify = useNotify();
    const { permissions } = usePermissions();

    const url = window.location.href;
    const [isEditMenuFood, setIsEditMenuFood] = React.useState<boolean>(false);
    const [isTabMenuFood, setIsTabMenuFood] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (permissions && permissions !== 'admin') {
            notify(`Permission Denied`);
            redirect('list');
        }
        if (url) {
            const urlParse = window.location.href.split('/');
            setIsTabMenuFood(urlParse[urlParse.length - 1] === 'menu-food');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, permissions]);

    return (
        <Edit
            {...props}
            title={<BranchTitle />}
            undoable={false}
            actions={<EditActions />}
            transform={transform}>
            <TabbedForm toolbar={<EditToolbar {...props} isEditMenuFood={isEditMenuFood} isTabMenuFood={isTabMenuFood} setIsEditMenuFood={setIsEditMenuFood} />}>
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
                            <BranchMenuFoodField label="商品一覧（メニュー）" source="food_ids" />
                            {/* <ReferenceArrayField
                                filter={{}}
                                reference="product"
                                source="food_ids"
                                label="商品一覧（メニュー）"
                                perPage={100}
                                fullWidth
                            >
                                <Datagrid>
                                    <CustomImageField source="image" noimage="food" />
                                    <TextField source="name" />
                                    <NumberField
                                        source="price"
                                        options={{ style: 'currency', currency: 'JPY' }}
                                    />
                                    <QrCodeDownloadButton />
                                </Datagrid>
                            </ReferenceArrayField> */}

                        </>
                    )}
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

export default BranchEdit;
