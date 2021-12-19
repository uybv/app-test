
import * as React from 'react';


const renderPaymentMethod = (type: any) => {
    let data = '';
    switch (type) {
        case 1:
            data = 'PayPay';
            break;
        case 2:
            data = 'Credit card';
            break;
        case 3:
            data = 'Apple pay';
            break;
        case 4:
            data = 'Google pay';
    }

    return data;
}

const OrderPaymentMethodAndTotalCostField = (props: any) => {
    const { record } = props;
    return record ? (
        <>
            <div>{renderPaymentMethod(record.payment.type)}</div>
            <div>{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(record.total)}</div>
        </>
    ) : null;
}

OrderPaymentMethodAndTotalCostField.defaultProps = {
    source: 'total',
    addLabel: true,
    label: '支払方法/金額'
};

export default OrderPaymentMethodAndTotalCostField;
