// material-ui
import React, { useState } from 'react';
import { Grid, Box, TextField } from '@mui/material';

// attribute options
const attributes = [
    {
        value: 'product_type_name',
        label: 'Product Type'
    },
    {
        value: 'product_group_name',
        label: 'Product Group'
    },
    {
        value: 'graphical_appearance_name',
        label: 'Graphical Apperance'
    },
    {
        value: 'colour_group_name',
        label: 'Colour Group'
    },
    {
        value: 'perceived_colour_value_name',
        label: 'Perceived Colour Value'
    },
    {
        value: 'perceived_colour_master_name',
        label: 'Perceived Colour Master'
    },
    {
        value: 'department_name',
        label: 'Department'
    },
    {
        value: 'section_name',
        label: 'Section'
    },
    {
        value: 'garment_group_name',
        label: 'Garment Group'
    }
];

const AttributeDropdown = (props) => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        if (event?.target.value) {
            setValue(event?.target.value);
            props.setAttribute(event?.target.value);
        }
    };

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
                <Box sx={{ px: 2, pt: 0.25 }}>
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        fullWidth
                        value={value}
                        onChange={handleChange}
                        SelectProps={{
                            native: true
                        }}
                    >
                        {attributes.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </Box>
            </Grid>
        </Grid>
    );
};

export default AttributeDropdown;
