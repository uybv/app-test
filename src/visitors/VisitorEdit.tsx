import * as React from 'react';
import {
    DateInput,
    Edit,
    EditProps,
    NullableBooleanInput,
    TextInput,
    PasswordInput,
    Toolbar,
    useTranslate,
    FormWithRedirect,
    required,
    email,
    FieldProps,
} from 'react-admin';
import { Box, Card, CardContent, Typography } from '@material-ui/core';

import Aside from './Aside';
import FullNameField from './FullNameField';
import { validatePasswords } from './VisitorCreate';
import { Customer } from '../types';

const VisitorEdit = (props: EditProps) => {
    return (
        <Edit
            title={<VisitorTitle />}
            // aside={<Aside />}
            component="div"
            {...props}
        >
            <VisitorForm />
        </Edit>
    );
};

const VisitorTitle = ({ record }: FieldProps<Customer>) =>
    record ? <FullNameField record={record} size="32" /> : null;

const VisitorForm = (props: any) => {
    const translate = useTranslate();

    return (
        <FormWithRedirect
            {...props}
            validate={validatePasswords}
            render={(formProps: any) => (
                <Card>
                    <form>
                        <CardContent>
                            <Box display={{ md: 'block', lg: 'flex' }}>
                                <Box flex={2} mr={{ md: 0, lg: '1em' }}>
                                    <Typography variant="h6" gutterBottom>
                                        {translate(
                                            'resources.customer.fieldGroups.identity'
                                        )}
                                    </Typography>
                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                label="resources.customer.fields.display_name.first_name"
                                                source="display_name.first_name"
                                                validate={requiredValidate}
                                                fullWidth
                                            />
                                        </Box>
                                        <Box
                                            flex={1}
                                            ml={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                label="resources.customer.fields.display_name.last_name"
                                                source="display_name.last_name"
                                                validate={requiredValidate}
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
                                                label="resources.customer.fields.display_name.first_name_kata"
                                                source="display_name.first_name_kata"
                                                validate={requiredValidate}
                                                fullWidth
                                            />
                                        </Box>
                                        <Box
                                            flex={1}
                                            ml={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                label="resources.customer.fields.display_name.last_name_kata"
                                                source="display_name.last_name_kata"
                                                validate={requiredValidate}
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
                                                label="resources.customer.fields.email"
                                                source="email"
                                                validate={[email(), required()]}
                                                fullWidth
                                            />
                                        </Box>
                                        <Box
                                            flex={1}
                                            ml={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                label="resources.customer.fields.phone"
                                                source="phone"
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
                                            flex={2}
                                            ml={{ xs: 0, sm: '0.5em' }}
                                        />
                                    </Box>

                                    <Box mt="1em" />

                                    <Typography variant="h6" gutterBottom>
                                        {translate(
                                            'resources.customer.fieldGroups.address'
                                        )}
                                    </Typography>
                                    <TextInput
                                        label="resources.customer.fields.address.address"
                                        source="address.address"
                                        multiline
                                        fullWidth
                                        helperText={false}
                                    />
                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        <Box
                                            flex={2}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                label="resources.customer.fields.address.prefecture"
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
                                                label="resources.customer.fields.address.city"
                                                source="address.city"
                                                fullWidth
                                                helperText={false}
                                            />
                                        </Box>
                                        <Box
                                            flex={2}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                label="resources.customer.fields.address.apartment"
                                                source="address.apartment"
                                                fullWidth
                                                helperText={false}
                                            />
                                        </Box>
                                        <Box flex={2}>
                                            <TextInput
                                                label="resources.customer.fields.address.postal_code"
                                                source="address.postal_code"
                                                fullWidth
                                                helperText={false}
                                            />
                                        </Box>
                                    </Box>

                                    <Box mt="1em" />
                                </Box>
                                {/* <Box
                                    flex={1}
                                    ml={{ xs: 0, lg: '1em' }}
                                    mt={{ xs: '1em', lg: 0 }}
                                >
                                    <Typography variant="h6" gutterBottom>
                                        {translate(
                                            'resources.customer.fieldGroups.stats'
                                        )}
                                    </Typography>
                                    <div>
                                        <NullableBooleanInput
                                            source="has_newsletter"
                                            resource="customer"
                                        />
                                    </div>
                                </Box> */}
                            </Box>
                        </CardContent>
                        <Toolbar
                            record={formProps.record}
                            basePath={formProps.basePath}
                            undoable={true}
                            invalid={formProps.invalid}
                            handleSubmit={formProps.handleSubmit}
                            saving={formProps.saving}
                            resource="customers"
                        />
                    </form>
                </Card>
            )}
        />
    );
};

const requiredValidate = [required()];

export default VisitorEdit;
