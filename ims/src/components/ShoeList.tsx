import { List, Datagrid, TextField, DateField, BooleanField, ImageField, NumberField } from 'react-admin';

export const ShoeList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="shoe_name" />
            <TextField source="shoe_color" />
            <NumberField source='num_of_shoes'/>
            <ImageField source='shoe_img' />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <TextField source='stall_location'/>
        </Datagrid>
    </List>
);