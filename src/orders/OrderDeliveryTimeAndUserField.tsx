
import moment from 'moment';
import * as React from 'react';
import { ReferenceFieldProps, ReferenceField } from 'react-admin';

const FullNameField = (props: any) => {
    const { record, } = props;
    return record ? (
        <div>
            {record?.display_name?.first_name ? record?.display_name?.first_name : ''} {record?.display_name?.last_name ? record?.display_name?.last_name : ''}
        </div>
    ) : null;
};

const OrderDeliveryTimeAndUserField = (props: Omit<ReferenceFieldProps, 'reference' | 'children' | 'source'> & {
    source?: string;
}) => {
    const { record } = props;
    return (
        <>
            <div style={{ marginBottom: 10 }}>{moment(record?.delivery_est).format('YYYY-MM-DD HH:mm')}</div>
            <ReferenceField source="user_id" reference="customer" link={false} {...props}>
                <FullNameField />
            </ReferenceField>
        </>
    );
}

OrderDeliveryTimeAndUserField.defaultProps = {
    source: 'user_id',
    addLabel: true,
    label: '来店予定日時/会員'
};

export default OrderDeliveryTimeAndUserField;
