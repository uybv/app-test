
import * as React from 'react';


const OrderFoodField = (props: any) => {
    const { record } = props;
    return record ? (
        <>
            <div style={{ marginBottom: 20 }}>{'受取番号: ' + record?.queuing}</div>
            <div>
                {record.foods.map((food: any) => (
                    <>
                        <div>{`${food.name}   ${food.quantity}点`}</div>
                        {food.additions &&
                            food.additions.map((opt: any, optIdx: any) => (
                                <div
                                    key={`${opt.name}-${optIdx}`}
                                    style={{
                                        fontSize: 14,
                                    }}>{`${opt.name}: ${opt.option_name}(+${opt.price}円)`}</div>
                            ))
                        }
                    </>
                ))}
            </div>
        </>
    ) : null;
}

OrderFoodField.defaultProps = {
    source: 'user_id',
    addLabel: true,
    label: '商品'
};

export default OrderFoodField;
