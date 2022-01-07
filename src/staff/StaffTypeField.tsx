import * as React from 'react';
import { ReferenceFieldProps } from 'react-admin';

const StaffTypeField = (props: Omit<ReferenceFieldProps, 'reference' | 'children' | 'source'> & {
    source?: string;
}) => {
    const { record } = props;
    return record ? (
        <div>
            {record.type === 1 ? '管理' : '無効'}
        </div>
    ) : null;
}

StaffTypeField.defaultProps = {
    source: 'type',
    addLabel: true,
    label: '種別'
};

export default StaffTypeField;
