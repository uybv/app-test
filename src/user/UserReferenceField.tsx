import * as React from 'react';
import { ReferenceField, ReferenceFieldProps } from 'react-admin';

import FullNameField from './FullNameField';

const UserReferenceField = (
    props: Omit<ReferenceFieldProps, 'reference' | 'children' | 'source'> & {
        source?: string;
    }
) => (
    <ReferenceField source="user_id" reference="user" link={false} {...props}>
        <FullNameField />
    </ReferenceField>
);

UserReferenceField.defaultProps = {
    source: 'user_id',
    addLabel: true,
};

export default UserReferenceField;
