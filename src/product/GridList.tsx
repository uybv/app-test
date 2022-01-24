import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import {
    linkToRecord,
    NumberField,
    useListContext,
    DatagridProps,
    Identifier,
    ReferenceField,
    useUpdate,
    useNotify,
    useRefresh,
    useRedirect
} from 'react-admin';
import { Link } from 'react-router-dom';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    gridList: {
        margin: 0,
    },
    tileBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
    },
    placeholder: {
        backgroundColor: theme.palette.grey[300],
        height: '100%',
    },
    price: {
        display: 'inline',
        fontSize: '1em',
    },
    link: {
        color: '#fff',
    },
}));

const getColsForWidth = (width: Breakpoint) => {
    if (width === 'xs') return 2;
    if (width === 'sm') return 3;
    if (width === 'md') return 3;
    if (width === 'lg') return 5;
    return 6;
};

const times = (nbChildren: number, fn: (key: number) => any) =>
    Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList = (props: GridProps & { nbItems?: number }) => {
    const { width, nbItems = 20 } = props;
    const classes = useStyles();
    return (
        <MuiGridList
            cellHeight={180}
            cols={getColsForWidth(width)}
            className={classes.gridList}
        >
            {' '}
            {times(nbItems, key => (
                <GridListTile key={key}>
                    <div className={classes.placeholder} />
                </GridListTile>
            ))}
        </MuiGridList>
    );
};

const CategoryNameField = (props: any) => {
    const { record } = props;
    return record ? (
        <div style={{
            maxWidth: '100%',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }}>
            {record.name}
        </div>
    ) : null;
};

const LoadedGridList = (props: any) => {
    // const { width } = props;
    const { ids, data, basePath } = useListContext();
    const classes = useStyles();
    const [update] = useUpdate();
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    if (!ids || !data) return null;

    const handleUpdatePosition = (record: any, data: any) => {
        update('product', record.id, data, record);
        notify(`更新しました`);
        setTimeout(() => {
            redirect('list', 'product');
            refresh();
        }, 200);
    }

    return (
        <div style={{}}>
            {ids.map((id: Identifier) => (
                <div key={id} style={{ display: 'inline-block', width: '20%', position: 'relative', margin: 2 }}>
                    <div style={{ height: 200 }}>
                        <Link
                            key={id}
                            to={linkToRecord(basePath, data[id].id)}
                            style={{ display: 'block', textDecoration: 'none', color: '#fff', height: '100%', width: '100%', overflowY: 'hidden' }}
                        >
                            <img style={{ width: 'auto', height: '100%', margin: 'auto', display: 'flex', alignSelf: 'center' }}
                                src={data[id].image ? data[id].image : "/assets/images/noimage.png"} alt="" />
                        </Link>
                        <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: 10,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
                                color: '#fff',
                            }}>
                                <div style={{ width: '60%' }}>
                                    <Link
                                        key={id}
                                        to={linkToRecord(basePath, data[id].id)}
                                        style={{ textDecoration: 'none', color: '#fff' }}
                                    >
                                        <div style={{
                                            maxWidth: '100%',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 1,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}>{data[id].name}</div>
                                        <div style={{ paddingTop: 5 }}>
                                            <NumberField
                                                className={classes.price}
                                                source="price"
                                                record={data[id]}
                                                color="inherit"
                                                options={{
                                                    style: 'currency',
                                                    currency: 'JPY',
                                                }}
                                            />
                                        </div>
                                    </Link>
                                </div>
                                <div style={{ width: '30%', textAlign: 'right', color: '#fff' }}>
                                    <ReferenceField source="cat_ids" reference="category" link={false} record={data[id]}>
                                        <CategoryNameField />
                                    </ReferenceField>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        paddingTop: 5
                                    }}>
                                        <span onClick={() => {
                                            handleUpdatePosition(data[id], { position_up: true })
                                        }}>
                                            <ChevronLeft
                                                style={data[id].position <= 1 ? { cursor: 'pointer', color: '#ccc' } : { cursor: 'pointer' }}
                                            />
                                        </span>
                                        <span>{data[id].position}</span>
                                        <span onClick={() => {
                                            handleUpdatePosition(data[id], { position_down: true })
                                        }}>
                                            <ChevronRight style={{ cursor: 'pointer' }} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

interface GridProps extends Omit<DatagridProps, 'width'>, WithWidth { }

const GridList = (props: WithWidth) => {
    const { width } = props;
    const { loaded } = useListContext();
    return loaded ? (
        <LoadedGridList width={width} />
    ) : (
        <LoadingGridList width={width} />
    );
};

export default withWidth()(GridList);
