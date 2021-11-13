import * as React from 'react';
import Chip from '@material-ui/core/Chip';
import { FieldProps } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    main: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: -8,
        marginBottom: -8,
    },
    chip: { margin: 4 },
});

const TagsField = ({ record }: FieldProps<any>) => {
    const classes = useStyles();

    return record ? (
        <span className={classes.main}>
            {record.tags &&
                record.tags.map((tag: string) => {
                    return tag ? (
                        <Chip
                            size="small"
                            id={(Math.random() + 1).toString(36).substring(12)}
                            className={classes.chip}
                            label={tag}
                        />
                    ) : null;
                })}
        </span>
    ) : null;
};

TagsField.defaultProps = {
    addLabel: true,
    source: 'tags',
};

export default TagsField;
