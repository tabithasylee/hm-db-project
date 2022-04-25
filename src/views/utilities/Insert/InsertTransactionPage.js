import { useEffect, useState } from 'react';

// material-ui
import { Button, Grid, Typography } from '@mui/material';

// project imports
import InputBar from '../InputBar';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const InsertTransactionPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [state, setState] = useState({
        t_dat: '',
        customer_id: '',
        article_id: '',
        price: '',
        sales_channel_id: ''
    });
    const [response, setResponse] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleSearchBtnClick = () => {
        const insertArticle = async () => {
            const response = await fetch('http://localhost:5000/transaction', {
                method: 'POST',
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
                        t_dat: '',
                        customer_id: '',
                        article_id: '',
                        price: '',
                        sales_channel_id: ''
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
                            Transaction Date (YYYY-MM-DD)
                        </Typography>
                        <InputBar id="t_dat" setState={setState} state={state} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Customer Id
                        </Typography>
                        <InputBar id="customer_id" setState={setState} state={state} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Article Id
                        </Typography>
                        <InputBar id="article_id" setState={setState} state={state} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Price
                        </Typography>
                        <InputBar id="price" setState={setState} state={state} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Sales Channel Id
                        </Typography>
                        <InputBar id="sales_channel_id" setState={setState} state={state} />
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

export default InsertTransactionPage;
