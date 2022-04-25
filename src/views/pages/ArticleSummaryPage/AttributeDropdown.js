// material-ui
import React, { useState } from 'react';
import { Grid, Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';

const StyledDropdown = styled(TextField, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    }
}));

// attribute options
const attributes = [
    {
        value: 'product_type_name',
        label: 'Product Type'
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
                    <StyledDropdown
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
                    </StyledDropdown>
                </Box>
            </Grid>
        </Grid>
    );
};

export default AttributeDropdown;
