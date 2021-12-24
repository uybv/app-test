
import moment from 'moment';
import * as React from 'react';
import { ReferenceFieldProps, ReferenceField } from 'react-admin';

const BranchNameField = (props: any) => {
    const { record } = props;
    return record ? (
        <div>
            {record.name}
        </div>
    ) : null;
};

const OrderCreatedTimeAndBranchField = (props: Omit<ReferenceFieldProps, 'reference' | 'children' | 'source'> & {
    source?: string;
}) => {
    const { record } = props;
    return (
        <>
            <div>{moment(new Date(record?.created_time)).format('YYYY-MM-DD HH:MM')}</div>
            <ReferenceField source="branch_id" reference="branch" link={false} {...props}>
                <BranchNameField />
            </ReferenceField>
        </>
    );
}

OrderCreatedTimeAndBranchField.defaultProps = {
    source: 'created_time',
    addLabel: true,
    label: '注文日時/店舗'
};

export default OrderCreatedTimeAndBranchField;
