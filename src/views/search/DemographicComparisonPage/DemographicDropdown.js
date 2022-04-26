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
        value: 'active',
        label: 'Active'
    },
    {
        value: 'club_member_status',
        label: 'Club Member Status'
    },
    {
        value: 'fashion_news_frequency',
        label: 'Fashion News Frequency'
    },
    {
        value: 'age',
        label: 'Age'
    },
    {
        value: 'postal_code',
        label: 'Postal Code'
    }
];

const AttributeDropdown = (props) => {
    const handleChange = (event) => {
        props.setAttribute(event.target.value);
    };

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
                <Box sx={{ px: 2, pt: 0.25 }}>
                    <StyledDropdown
                        id="outlined-select-currency-native"
                        select
                        fullWidth
                        value={props.attribute}
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
