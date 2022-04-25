import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, OutlinedInput, Popper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconSearch, IconX } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';

// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
    zIndex: 1100,
    width: '99%',
    top: '-55px !important',
    padding: '0 12px',
    [theme.breakpoints.down('sm')]: {
        padding: '0 10px'
    }
}));

const SelectStyle = styled(Select, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    }
    // [theme.breakpoints.down('lg')]: {
    //     width: '75%',
    //     marginLeft: 4,
    //     background: '#fff'
    // },
    // [theme.breakpoints.down('md')]: {
    //     width: '100%',
    //     marginLeft: 4,
    //     background: '#fff'
    // }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&:hover': {
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.light
    }
}));

const options = [
    'Show some love to MUI',
    'Show all notification content',
    'Hide sensitive notification content',
    'Hide all notification content'
];
// ==============================|| SEARCH INPUT ||============================== //

const InputDropdown = (props) => {
    const theme = useTheme();
    const [value, setValue] = useState('');
    const [dropdownItems, setDropdownItem] = useState([
        { value: 10, name: 'Ten' },
        { value: 20, name: 'Twenty' }
    ]);

    const handleChange = (event) => {
        console.log(event.target.value);
        if (event.target.value === 'null') {
            setValue('');
            props.setState({ ...props.state, [props.id]: '' });
        } else {
            setValue(event.target.value);
            props.setState({ ...props.state, [props.id]: event.target.value });
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <FormControl fullWidth>
                <InputLabel sx={{ paddingLeft: 2 }} id="demo-simple-select-label">
                    {props.id}
                </InputLabel>
                <SelectStyle
                    labelId="demo-simple-select-label"
                    id={props.id}
                    value={props.state[props.id]}
                    label="Age"
                    onChange={handleChange}
                >
                    {props.options.map((option) => (
                        <MenuItem key={option} id={props.id} value={option} onClick={handleChange}>
                            {option}
                        </MenuItem>
                    ))}
                </SelectStyle>
            </FormControl>
        </Box>
    );
};

export default InputDropdown;
