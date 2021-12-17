import * as React from "react";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const MyDatagridRow = ({ record, resource, id, onToggleItem, children, selected, selectable, basePath }: any) => (
    <TableRow key={id}>
        {/* data columns based on children */}
        {React.Children.map(children, field => (
            <TableCell key={`${id}-${field.props.source}`}>
                {React.cloneElement(field, {
                    record,
                    basePath,
                    resource,
                })}
            </TableCell>
        ))}
    </TableRow>
);

export default MyDatagridRow;