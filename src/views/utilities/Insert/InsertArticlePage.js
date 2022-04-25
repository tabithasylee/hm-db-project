import { useEffect, useState } from 'react';

// material-ui
import { Button, Grid, Typography } from '@mui/material';

// project imports
import InputBar from '../InputBar';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const InsertArticlePage = () => {
    const [isLoading, setLoading] = useState(true);
    const [state, setState] = useState({
        article_id: '',
        product_code: '',
        prod_name: '',
        product_type_no: '',
        graphical_appearance_no: '',
        colour_group_code: '',
        perceived_colour_value_id: '',
        perceived_colour_master_id: '',
        department_no: '',
        index_code: '',
        index_group_no: '',
        section_no: '',
        garment_group_no: '',
        detail_desc: ''
    });
    const [response, setResponse] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleSearchBtnClick = () => {
        const insertArticle = async () => {
            const response = await fetch('http://localhost:5000/article', {
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
                        article_id: '',
                        product_code: '',
                        prod_name: '',
                        product_type_no: '',
                        graphical_appearance_no: '',
                        colour_group_code: '',
                        perceived_colour_value_id: '',
                        perceived_colour_master_id: '',
                        department_no: '',
                        index_code: '',
                        index_group_no: '',
                        section_no: '',
                        garment_group_no: '',
                        detail_desc: ''
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
                            Article ID
                        </Typography>
                        <InputBar id="article_id" setState={setState} state={state} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Product Code
                        </Typography>
                        <InputBar id="product_code" setState={setState} state={state} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Product Name
                        </Typography>
                        <InputBar id="prod_name" setState={setState} state={state} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Product Type No
                        </Typography>
                        <InputBar id="product_type_no" setState={setState} state={state} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Graphical Appearance No
                        </Typography>
                        <InputBar id="graphical_appearance_no" setState={setState} state={state} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Colour Group Code
                        </Typography>
                        <InputBar id="colour_group_code" setState={setState} state={state} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Perceived Colour Value Id
                        </Typography>
                        <InputBar id="perceived_colour_value_id" setState={setState} state={state} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Perceived Colour Master Id
                        </Typography>
                        <InputBar id="perceived_colour_master_id" setState={setState} state={state} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Department Number
                        </Typography>
                        <InputBar id="department_no" setState={setState} state={state} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Index Code
                        </Typography>
                        <InputBar id="index_code" setState={setState} state={state} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Index Group Number
                        </Typography>
                        <InputBar id="index_group_no" setState={setState} state={state} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Section Number
                        </Typography>
                        <InputBar id="section_no" setState={setState} state={state} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Garment Group Number
                        </Typography>
                        <InputBar id="garment_group_no" setState={setState} state={state} />
                        <Typography variant="h4" sx={{ px: 2, paddingTop: 4 }}>
                            Detailed Description
                        </Typography>
                        <InputBar id="detail_desc" setState={setState} state={state} />
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button size="large" color="secondary" variant="contained" onClick={handleSearchBtnClick}>
                            Search
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

export default InsertArticlePage;
