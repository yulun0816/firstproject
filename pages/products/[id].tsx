import Layout from '@/components/layout/layout';
import { GetStaticProps, GetServerSideProps, GetStaticPaths } from 'next';
import { productType, paramsState } from '@/model/customType';
import productsStyle from './products.module.scss';
import Image from 'next/image';
import React, { useState } from 'react';
import { getCartItem, setCartItem } from 'reducer/projectReducer';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import Slide, { SlideProps } from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import { CartCountBtn } from '@/components/common/Common';


function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const api = await fetch('https://firstproject-sigma-black.vercel.app/api/products', {
        method: "POST",
        body: JSON.stringify({ filter: 'id' }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await api.json();
    const paths = data.map(item => '/products/' + item);
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const api = await fetch('https://firstproject-sigma-black.vercel.app/api/products', {
        method: "POST",
        body: JSON.stringify({ id: params.id }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await api.json();
    const postData = data[0];
    return {
        props: {
            postData,
        },
    };
}

export default function Product({ postData }: { postData: productType }) {
    const [open, setOpen] = React.useState(false);
    const cartItem = useSelector(getCartItem);
    const dispatch = useDispatch();

    const [count, setCount] = useState(1);

    const handlerMinusAndPlus = (type: string) => {
        switch (type) {
            case "plus":
                setCount(n => n + 1);
                break;
            case "minus":
                if (count - 1 > 0) {
                    setCount(n => n - 1);
                }
                break;
        }
    }

    const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let v = parseInt(event.target.value);
        if (isNaN(v) || !v) {
            setCount(1)
        } else {
            setCount(parseInt(event.target.value))
        }
    }

    const handlerCartAdd = () => {
        const existingItemIndex = cartItem.findIndex(item => item.id === postData.id);
        if (existingItemIndex !== -1) {
            const updateData = [...cartItem];
            updateData[existingItemIndex] = { ...updateData[existingItemIndex], count: updateData[existingItemIndex].count + count }
            dispatch(setCartItem(updateData))
        } else {
            dispatch(setCartItem([...cartItem, { id: postData.id, count: count }]))
        }
        setOpen(true);
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Layout>
            <div className={productsStyle.container}>
                <div className={productsStyle.productContent}>
                    <div className={productsStyle.productImage}>
                        <Image
                            src={`/images/products/${postData.img}`}
                            width={550}
                            height={550}
                            priority
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                            alt=""
                        />
                    </div>
                    <div className={productsStyle.productText}>
                        <div className={productsStyle.productName}>{postData.name}</div>
                        <div className={productsStyle.productDesc} dangerouslySetInnerHTML={{ __html: postData.desc }}></div>
                        <div className={productsStyle.productPrice}>NT${postData.price}</div>
                        <CartCountBtn
                            handlerMinus={() => handlerMinusAndPlus("minus")}
                            handlerPlus={() => handlerMinusAndPlus("plus")}
                            handlerInputChange={(e) => handlerInputChange(e)}
                            min={1}
                            value={count}
                        />
                        <div>
                            <button className={productsStyle.cartAddBtn} onClick={handlerCartAdd}>加入購物車</button>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
                TransitionComponent={SlideTransition}
            >
                <Alert severity="success">已成功加入購物車</Alert>
            </Snackbar>
        </Layout>
    )
}