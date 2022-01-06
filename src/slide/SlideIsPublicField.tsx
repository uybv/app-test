import * as React from 'react';
import { ReferenceFieldProps } from 'react-admin';

const SlideIsPublicField = (props: Omit<ReferenceFieldProps, 'reference' | 'children' | 'source'> & {
    source?: string;
}) => {
    const { record } = props;
    return record ? (
        <div>
            {record.is_public ? '有効' : '無効'}
        </div>
    ) : null;
}

SlideIsPublicField.defaultProps = {
    source: 'is_public',
    addLabel: true,
    label: '有効'
};

export default SlideIsPublicField;
