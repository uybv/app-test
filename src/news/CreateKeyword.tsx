import * as React from 'react';
import {
    useCreate,
    useCreateSuggestionContext,
} from 'react-admin';
import {
    Box,
    BoxProps,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField,
} from '@material-ui/core';

const CreateKeyword = () => {
    const { filter, onCancel, onCreate } = useCreateSuggestionContext();
    const [value, setValue] = React.useState(filter || '');
    const [create] = useCreate('keywords');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        create(
            {
                payload: {
                    data: {
                        title: value,
                    },
                },
            },
            {
                onSuccess: ({ data }: { data: any }) => {
                    setValue('');
                    onCreate(data);
                },
            }
        );
    };

    return (
        <Dialog open onClose={onCancel}>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        label="New keyword"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        autoFocus
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Save</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CreateKeyword;
