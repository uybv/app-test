/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Button, Toolbar } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import _ from 'lodash';

const PrevNextPagination = (props: any) => {
    if (!props) {
        return null;
    }
    const [nextToken, setNextToken] = useState('');
    const [prevToken, setPrevToken] = useState(undefined);

    const useToolbarStyles = makeStyles({
        defaultToolbar: {
            flex: 1,
            display: 'flex',
            justifyContent: 'end',
        },
    });
    const classes = useToolbarStyles();

    useEffect(() => {
        setNextToken(props.nextToken);
        if (!props.filterValues.nextToken) {
            setPrevToken(undefined);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.nextToken]);

    return (nextToken || prevToken) ? (
        <Toolbar className={classes.defaultToolbar}>
            {prevToken !== undefined && (
                <Button color="primary" key="prev" onClick={() => {
                    props.setFilters(_.assign(props.filterValues, { nextToken: props.nextToken ? prevToken : '' }));
                }}>
                    <ChevronLeft />
                    前へ
                </Button>
            )}
            {nextToken && (
                <Button color="primary" key="next" onClick={() => {
                    const current = props.filterValues;
                    setPrevToken(current?.nextToken ?? '');
                    props.setFilters(_.assign(props.filterValues, { nextToken: nextToken }));
                }}>
                    次へ
                    <ChevronRight />
                </Button>
            )}

        </Toolbar>
    ) : null;
}

export default PrevNextPagination;