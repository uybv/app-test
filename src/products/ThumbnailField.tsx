import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FieldProps } from 'react-admin';
import { Product } from '../types';

const useStyles = makeStyles({
    root: { width: 100, maxWidth: 100, maxHeight: 100 },
});

const ThumbnailField = (props: FieldProps<Product>) => {
    const { record } = props;
    const classes = useStyles();
    return record ? (
        <img src={record.image} className={classes.root} alt="" />
    ) : null;
};

export default ThumbnailField;
