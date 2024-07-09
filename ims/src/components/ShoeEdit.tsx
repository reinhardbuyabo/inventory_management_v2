import { Edit, SimpleForm, TextInput, DateInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, required, ImageField } from 'react-admin';

export const ShoeEdit = () => {
  return (
    <Edit>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" />
            <TextInput source="shoe_name" validate={required()} />
            <DateInput disabled label="Created At" source="created_at" />
            <DateInput disabled label="Updated At" source="updated_at" />
            <TextField source='stall_location' />
        </SimpleForm>
    </Edit>
  )
}