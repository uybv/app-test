import * as React from 'react';
import {
    TextInput,
    ImageInput,
    ImageField,
} from 'react-admin';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles({
    root: { display: 'inline-block', marginTop: '1em', zIndex: 2, position: 'relative' },
    content: { padding: 0, '&:last-child': { padding: 0 } },
    img: {
        width: 'initial',
        minWidth: 'initial',
        maxWidth: '42em',
        maxHeight: '15em',
    },
});

const MyImageField = (props: any) => {
    const { record, source } = props;
    const classes = useStyles();

    const [sourceUrl, setSourceUrl] = React.useState(record[source]);

    return sourceUrl ? (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <img src={record[source]} alt="" className={classes.img} />
            </CardContent>
            <span style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                right: 0,
                top: 0,
                height: 30,
                width: 30,
                backgroundColor: '#fff',
                borderBottomLeftRadius: 10,
                cursor: 'pointer'
            }}
                onClick={() => {
                    setSourceUrl('');
                }}><Delete /></span>
        </Card>
    ) : (
        <>
            <ImageInput source="images"
                label="resources.slide.fields.image"
                accept="image/*"
                maxSize={1000000}
            >
                <ImageField source="src" />
            </ImageInput>
            <TextInput source="change_image" style={{ display: 'none' }} defaultValue={true} />
        </>

    );
};

export default MyImageField;
