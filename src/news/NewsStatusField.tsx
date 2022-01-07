import * as React from 'react';
import { ReferenceFieldProps } from 'react-admin';

const NewsStatusField = (props: Omit<ReferenceFieldProps, 'reference' | 'children' | 'source'> & {
    source?: string;
}) => {
    const { record } = props;
    if (!record) {
        return null;
    }
    const currentTime = new Date().valueOf();

    if (record.is_public && record.publish_time > currentTime && record.expired_time > currentTime) {
        return (<>公開中</>);
    }
    if (record.is_public && record.publish_time > currentTime) {
        return (<>公開予約</>);
    }
    if (record.is_public && record.expired_time < currentTime) {
        return (<>終了</>);
    }

    return (<>非公開</>);
}

NewsStatusField.defaultProps = {
    source: 'st',
    addLabel: true,
    label: '状態'
};

export default NewsStatusField;
