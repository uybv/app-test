import * as React from 'react';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';

const PositionField = (props: any) => {
    const { record, onUp, onDown } = props;
    record.position = record.position ? record.position : 0;
    return record ? (
        <div>
            <div>{record.position}</div>
            <>
                <span onClick={() => {
                    onUp(record, { position_up: true })
                }}>
                    <ArrowUpward
                        style={record.position <= 1 ? { cursor: 'pointer', color: '#ccc' } : { cursor: 'pointer' }}
                    />
                </span>
                <span onClick={() => {
                    onDown(record, { position_down: true })
                }}>
                    <ArrowDownward style={{ cursor: 'pointer' }} />
                </span>
            </>
        </div>
    ) : null;
}

PositionField.defaultProps = {
    source: 'position',
    addLabel: true,
    label: '順序'
};

export default PositionField;
