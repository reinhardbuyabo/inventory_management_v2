import { List, Datagrid, TextField, DateField, BooleanField, ImageField } from 'react-admin';

export const ManagerList = () => (
    <List>
        <Datagrid>
            <TextField source="emp_name" />
            <TextField source="emp_email" />
        </Datagrid>
    </List>
);