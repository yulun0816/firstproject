import Head from 'next/head';
import Product from '@/components/product/product';
import Layout from '@/components/layout/layout';
import { GetStaticProps } from 'next';
import { productType } from '@/model/customType';

export const getStaticProps: GetStaticProps = async () => {
    const productionsData = await (await fetch('http://127.0.0.1:3000/api/products')).json();
    return {
        props: {
            productionsData
        }
    }
}

export default function Products({ productionsData }: { productionsData: [productType] }) {
    return (
        <Layout>
            <Head>
                <title>所有商品</title>
            </Head>
            <Product productionsData={productionsData} />
        </Layout>
    )
}