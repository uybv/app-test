import * as React from 'react';

const CustomImageField = (props: any) => {
    const { record, source } = props;
    return record ? (
        <div>
            <img style={{ height: '200px', width: 'auto' }} src={record[source] ? record[source] : "/assets/images/noimage.png"} alt="" />
        </div>
    ) : null;
}

CustomImageField.defaultProps = {
    addLabel: true,
    label: '画像'
};

export default CustomImageField;
