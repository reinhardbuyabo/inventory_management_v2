import { Show, SimpleShowLayout, TextField, DateField, ImageField, RichTextField, NumberField } from 'react-admin';

export const ShoeShow = () => (
    <Show>
        <SimpleShowLayout>
        <TextField source="id" />
            <TextField source="shoe_name" />
            <TextField source="shoe_color" />
            <NumberField source='num_of_shoes'/>
            <ImageField source='shoe_img' />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <TextField source='stall_location'/>
        </SimpleShowLayout>
    </Show>
);