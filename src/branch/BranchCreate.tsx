import * as React from 'react';
import { useEffect } from 'react';
import {
    Create,
    CreateProps,
    TabbedForm,
    TextInput,
    FormTab,
    required,
    minValue,
    NumberInput,
    ReferenceArrayInput,
    AutocompleteArrayInput,
    ArrayInput,
    SimpleFormIterator,
    FormDataConsumer,
    BooleanInput,
    useRedirect,
    useNotify,
    usePermissions
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment } from '@material-ui/core';
import _ from 'lodash';

export const styles = {
    width50: { width: 50 },
    width100: { width: 100 },
    width200: { width: 200 },
    width600: { width: 600 },
    inputHoliday: { width: 50 },
    labelHoLiday: { display: 'inline-block', width: 100 },
    dayOfWeek: { display: 'inline-block', width: 100 },
    displayInlineBlock: { display: 'inline-block', marginRight: 20 },
    inputTime: { width: 150, marginRight: 20 },
};

export const workingTimes = [
    {
        day_of_week: '日曜日',
        not_holiday: false,
        start_at: '08:00',
        end_at: '18:00',
    },
    {
        day_of_week: '月曜日',
        not_holiday: true,
        start_at: '08:00',
        end_at: '18:00',
    },
    {
        day_of_week: '火曜日',
        not_holiday: true,
        start_at: '08:00',
        end_at: '18:00',
    },
    {
        day_of_week: '水曜日',
        not_holiday: true,
        start_at: '08:00',
        end_at: '18:00',
    },
    {
        day_of_week: '木曜日',
        not_holiday: true,
        start_at: '08:00',
        end_at: '18:00',
    },
    {
        day_of_week: '金曜日',
        not_holiday: true,
        start_at: '08:00',
        end_at: '18:00',
    },
    {
        day_of_week: '土曜日',
        not_holiday: false,
        start_at: '08:00',
        end_at: '18:00',
    },
];

export const getDayOfWeek = (index: any) => {
    return !_.isUndefined(workingTimes[index]) ? workingTimes[index].day_of_week : '';
}

export const processWorkingTime = (data: any) => {
    if (!data.not_holiday) {
        return {};
    }
    const start = data.start_at.split(":");
    const end = data.end_at.split(":");
    return {
        start_at: (start[0] * 60 * 60 * 1000) + (start[1] * 60 * 1000),
        end_at: (end[0] * 60 * 60 * 1000) + (end[1] * 60 * 1000),
    };
}

export const transform = (data: any) => {
    if (data.working_times) {
        data.working_times = data.working_times.map((v: any) => { return processWorkingTime(v); });
    }
    if (!_.isUndefined(data.delivery_est)) {
        data.delivery_est = data.delivery_est * 60 * 1000;
    }
    return data;
};

export const minWorkingTime = () => (value: any, allValues: any, props: any) => {
    return value === '00:00' ? { message: 'ra.validation.minValue', args: { min: '00:00' } as any } : undefined;
}

const useStyles = makeStyles(styles);

const BranchCreate = (props: CreateProps) => {
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

    return (
        <Create {...props} transform={transform}>
            <TabbedForm redirect="list">
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
                    <ArrayInput source="working_times" label="営業時間" defaultValue={workingTimes}>
                        <SimpleFormIterator getItemLabel={(index) => ''}
                            disableRemove disableAdd disableReordering >
                            <FormDataConsumer {...props}>
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
                    <ReferenceArrayInput
                        className={classes.width600}
                        reference="product"
                        source="food_ids"
                    >
                        <AutocompleteArrayInput />
                    </ReferenceArrayInput>
                </FormTab>
            </TabbedForm>
        </Create>
    );
};

export default BranchCreate;
