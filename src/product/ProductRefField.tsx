import * as React from 'react';
import { Link } from 'react-router-dom';
import { FieldProps } from 'react-admin';
import { Product } from '../types';

const ProductRefField = ({ record }: FieldProps<Product>) =>
    record ? (
        <Link to={`product/${record.id}`}>{record.name}</Link>
    ) : null;

ProductRefField.defaultProps = {
    source: 'id',
    label: '名前',
};

export default ProductRefField;
