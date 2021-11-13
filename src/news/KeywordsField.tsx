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

const KeywordsField = ({ record }: FieldProps<any>) => {
    const classes = useStyles();

    return record ? (
        <span className={classes.main}>
            {record.keywords &&
                record.keywords.map((keyword: string) => {
                    return keyword ? (
                        <Chip
                            size="small"
                            id={(Math.random() + 1).toString(36).substring(12)}
                            className={classes.chip}
                            label={keyword}
                        />
                    ) : null;
                })}
        </span>
    ) : null;
};

KeywordsField.defaultProps = {
    addLabel: true,
    source: 'keywords',
};

export default KeywordsField;
