import * as React from "react";
import { TableHead, TableRow, TableCell } from '@material-ui/core';
import { FieldTitle, useResourceContext } from 'ra-core';

const MyDatagridHeader = (props: any) => {
    const resource = useResourceContext(props);

    return (
        <TableHead>
            <TableRow>
                {React.Children.map(props.children, child => (
                    <TableCell key={child.props.source}>
                        <FieldTitle
                            label={child.props.label}
                            source={child.props.source}
                            resource={resource}
                        />
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default MyDatagridHeader;