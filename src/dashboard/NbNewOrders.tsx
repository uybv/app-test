import * as React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import CardWithIcon from './CardWithIcon';

interface Props {
    value?: number;
}

const NbNewOrders = (props: Props) => {
    const { value } = props;
    return (
        <CardWithIcon
            to="/order"
            icon={ShoppingCartIcon}
            title={"本日のオーダー数"}
            subtitle={value?.toString()}
        />
    );
};

export default NbNewOrders;
