import { useEffect, useState } from 'react';

// material-ui
import { Button, Grid, Typography } from '@mui/material';

// project imports
import ArticleTransactionsTable from './ArticleTransactionsTable';
import TableSearchBar from '../TableSearchBar';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const ArticleTransactionsPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [articleId, setArticleId] = useState('');
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        console.log(articleId);
    }, [articleId]);

    const handleSearchBtnClick = () => {
        const getTableData = async () => {
            console.log('trying to fetch search results');
            const response = await fetch(`http://localhost:5000/articletransactions?articleId=${articleId}`);
            const data = await response.json();
            setTableData(data[0]);
        };
        getTableData();
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <Typography variant="body" sx={{ paddingLeft: 2 }}>
                            Enter a article id to see their transactions.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h4" sx={{ paddingLeft: 2 }}>
                            Article Id
                        </Typography>
                        <TableSearchBar setState={setArticleId} />
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button size="large" color="secondary" variant="contained" onClick={handleSearchBtnClick}>
                            Search
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <ArticleTransactionsTable isLoading={isLoading} tableData={tableData} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ArticleTransactionsPage;
