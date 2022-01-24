import * as React from 'react';
import {
    DateInput,
    Edit,
    EditProps,
    BooleanInput,
    TextInput,
    Toolbar,
    useTranslate,
    FormWithRedirect,
    email,
    FieldProps,
    TopToolbar,
    ListButton,
    SelectInput,
    Labeled
} from 'react-admin';
import { Box, Card, CardContent, Typography } from '@material-ui/core';

import Aside from './Aside';
import FullNameField from './FullNameField';
import { User } from '../types';
import { ChevronLeft } from '@material-ui/icons';

const UserTitle = ({ record }: FieldProps<User>) =>
    record ? <FullNameField record={record} size="32" /> : null;

const EditActions = ({ basePath, data }: any) => (
    <TopToolbar>
        <ListButton basePath={basePath} icon={<ChevronLeft />} />
    </TopToolbar>
);

const UserEdit = (props: EditProps) => {
    return (
        <Edit
            title={<UserTitle />}
            // aside={<Aside />}
            component="div"
            {...props}
            undoable={false}
            actions={<EditActions />}
        >
            <UserForm />
        </Edit>
    );
};

function renderAuthSNS(data: string[]): string {
    let string = '';
    data.forEach(v => {
        if (v === 'email') {
            string += 'Gmail,'
        }
        if (v === 'google') {
            string += 'Google,'
        }
        if (v === 'facebook') {
            string += 'Facebook,'
        }
        if (v === 'apple') {
            string += 'Apple,'
        }

    });
    return string;
}


const UserForm = (props: any) => {
    const translate = useTranslate();

    return (
        <FormWithRedirect
            {...props}
            render={(formProps: any) => (
                <Card>
                    <form>
                        <CardContent>
                            <Box maxWidth="50em" display={{ md: 'block', lg: 'flex' }}>
                                <Box flex={2} mr={{ md: 0, lg: '1em' }}>
                                    <Typography variant="h6" gutterBottom>
                                        会員情報
                                    </Typography>
                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                label="resources.user.fields.display_name.last_name"
                                                source="display_name.last_name"
                                                fullWidth
                                            />
                                        </Box>
                                        <Box
                                            flex={1}
                                            ml={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                label="resources.user.fields.display_name.first_name"
                                                source="display_name.first_name"
                                                fullWidth
                                            />
                                        </Box>
                                    </Box>
                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                label="resources.user.fields.display_name.last_name_kata"
                                                source="display_name.last_name_kata"
                                                fullWidth
                                            />
                                        </Box>
                                        <Box
                                            flex={1}
                                            ml={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                label="resources.user.fields.display_name.first_name_kata"
                                                source="display_name.first_name_kata"
                                                fullWidth
                                            />
                                        </Box>
                                    </Box>
                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                label="resources.user.fields.email"
                                                source="email"
                                                validate={[email()]}
                                                fullWidth
                                            />
                                        </Box>
                                        <Box
                                            flex={1}
                                            ml={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                label="resources.user.fields.phone"
                                                source="phone_number"
                                                fullWidth
                                            />
                                        </Box>
                                    </Box>
                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <DateInput
                                                source="birth_day"
                                                fullWidth
                                                helperText={false}
                                            />
                                        </Box>
                                        <Box
                                            flex={1}
                                            ml={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <SelectInput
                                                label="性別"
                                                resource="user"
                                                source="gender"
                                                choices={[
                                                    {
                                                        id: 1,
                                                        name: '男性',
                                                    },
                                                    {
                                                        id: 2,
                                                        name: '女性',
                                                    },
                                                    {
                                                        id: 3,
                                                        name: 'Other',
                                                    },
                                                ]}
                                            />
                                        </Box>
                                    </Box>

                                    <Box mt="1em" />

                                    <Typography variant="h6" gutterBottom>
                                        {translate(
                                            'resources.user.fieldGroups.address'
                                        )}
                                    </Typography>
                                    <TextInput
                                        label="resources.user.fields.address.address"
                                        source="address.address"
                                        multiline
                                        fullWidth
                                        helperText={false}
                                    />
                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        <Box flex={2}
                                            mr={{ xs: 0, sm: '0.5em' }}>
                                            <TextInput
                                                label="resources.user.fields.address.postal_code"
                                                source="address.postal_code"
                                                fullWidth
                                                helperText={false}
                                            />
                                        </Box>
                                        <Box
                                            flex={2}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                label="resources.user.fields.address.prefecture"
                                                source="address.prefecture"
                                                fullWidth
                                                helperText={false}
                                            />
                                        </Box>
                                        <Box
                                            flex={2}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                label="resources.user.fields.address.city"
                                                source="address.city"
                                                fullWidth
                                                helperText={false}
                                            />
                                        </Box>
                                        <Box
                                            flex={2}
                                        >
                                            <TextInput
                                                label="resources.user.fields.address.apartment"
                                                source="address.apartment"
                                                fullWidth
                                                helperText={false}
                                            />
                                        </Box>
                                    </Box>

                                    <Box mt="4em" />

                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <Typography variant="h6" gutterBottom>
                                                パスワード登録
                                            </Typography>
                                            <Box display={{ xs: 'block', sm: 'flex' }}>
                                                <Box
                                                    flex={1}
                                                    mr={{ xs: 0, sm: '0.5em' }}
                                                >
                                                    <Labeled
                                                        label="パスワード登録"
                                                    >
                                                        <>{formProps.record.password ? 'あり' : 'なし'}</>
                                                    </Labeled>
                                                </Box>
                                                <Box
                                                    flex={1}
                                                    mr={{ xs: 0, sm: '0.5em' }}
                                                >
                                                    <Labeled
                                                        label="SNS連携"
                                                    >
                                                        <>{renderAuthSNS(formProps.record.auth_via)}</>
                                                    </Labeled>
                                                </Box>
                                            </Box>

                                        </Box>
                                        <Box
                                            flex={1}
                                            ml={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <Typography variant="h6" gutterBottom>
                                                メール配信設定
                                            </Typography>
                                            <Box display={{ xs: 'block', sm: 'flex' }}>
                                                <BooleanInput label="お知らせ、キャンペーンなど" source="email_settings.campaign" />
                                            </Box>
                                            <Box display={{ xs: 'block', sm: 'flex' }}>
                                                <BooleanInput label="新商品先行告知" source="email_settings.new_food" />
                                            </Box>


                                        </Box>
                                    </Box>

                                </Box>
                            </Box>
                        </CardContent>
                        <Toolbar
                            record={formProps.record}
                            basePath={formProps.basePath}
                            undoable={false}
                            invalid={formProps.invalid}
                            handleSubmit={formProps.handleSubmit}
                            saving={formProps.saving}
                            resource="user"
                        />
                    </form>
                </Card>
            )}
        />
    );
};

export default UserEdit;
