import Head from 'next/head';
import Layout from '@/components/layout/layout';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { getCartItem } from 'reducer/projectReducer';
import { useSelector } from 'react-redux';

export default function Cart() {
    // const cartItem = useSelector(getCartItem);
    // console.log(cartItem)
    return (
        <Layout>
            <Head>
                <title>購物車</title>
            </Head>
            <CssBaseline />
            <Container maxWidth="lg">
                <Stack sx={{ width: '100%', margin: "1.5rem 0" }} spacing={2}>
                    <Alert icon={false} variant="outlined">您的購物車裡還沒有任何商品。</Alert>
                </Stack>
            </Container>
        </Layout>
    )
}