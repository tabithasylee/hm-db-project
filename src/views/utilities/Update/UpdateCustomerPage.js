import { useEffect, useState } from 'react';

// material-ui
import { Button, Grid, Typography } from '@mui/material';

// project imports
import InputBar from '../InputBar';
import InputDropdown from '../InputDropdown';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const UpdateCustomerPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [state, setState] = useState({
        customer_id: '',
        fn: '',
        active: '',
        club_member_status: '',
        fashion_news_frequency: '',
        age: '',
        postal_code: ''
    });
    const [response, setResponse] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleSearchBtnClick = () => {
        const insertArticle = async () => {
            const response = await fetch('http://localhost:5000/customer', {
                method: 'PUT',
                body: JSON.stringify(state),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                let msg = JSON.parse(data.result)[0][0]['msg'];
                if (msg === 'The transaction was commited.') {
                    setResponse('Success: The transaction was commited.');
                    setError(false);
                    setState({
                        customer_id: '',
                        fn: '',
                        active: '',
                        club_member_status: '',
                        fashion_news_frequency: '',
                        age: '',
                        postal_code: ''
                    });
                } else {
                    setResponse('Error: the transaction was rolled back');
                    setError(true);
                }
            } else {
                setResponse('internal error');
                setError(true);
            }
        };
        insertArticle();
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h4" sx={{ display: 'flex', px: 2, paddingTop: 4 }}>
                            Customer ID
                        </Typography>
                        <InputBar id="customer_id" setState={setState} state={state} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            fn
                        </Typography>
                        <InputDropdown id="fn" setState={setState} state={state} options={['1', 'null']} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Active
                        </Typography>
                        <InputDropdown id="active" setState={setState} state={state} options={['1', 'null']} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Club Member Status
                        </Typography>
                        <InputDropdown id="club_member_status" setState={setState} state={state} options={['ACTIVE', 'PRE-CREATE']} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Fashion News Frequency
                        </Typography>
                        <InputDropdown
                            id="fashion_news_frequency"
                            setState={setState}
                            state={state}
                            options={['NONE', 'SOME', 'Regularly']}
                        />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Age
                        </Typography>
                        <InputBar id="age" setState={setState} state={state} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Postal Code
                        </Typography>
                        <InputBar id="postal_code" setState={setState} state={state} />
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button size="large" color="secondary" variant="contained" onClick={handleSearchBtnClick}>
                            Insert
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {response !== '' && (
                            <Typography variant="h4" color={error ? 'error.dark' : 'success.dark'}>
                                {response}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UpdateCustomerPage;
