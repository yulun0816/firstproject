import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/layout/layout';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { getCartItem, setCartItem } from 'reducer/projectReducer';
import { useSelector, useDispatch } from 'react-redux';
import { GetStaticProps } from 'next';
import { productType } from '@/model/customType';
import { CartCountBtn } from '@/components/common/Common';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import Button from '@mui/material/Button';
import DialogCommon from '@/components/dialog/DialogCommon';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';


export const getStaticProps: GetStaticProps = async () => {
    const productionsData = await (await fetch('https://firstproject-sigma-black.vercel.app/api/products')).json();
    return {
        props: {
            productionsData
        }
    }
}

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

export default function Cart({ productionsData }: { productionsData: [productType] }) {
    const cartItem = useSelector(getCartItem);
    const idSet = new Set(cartItem.map(item => item.id));
    const newProductionData = productionsData.filter((item) => idSet.has(item.id)).map((item) => ({ ...item, count: cartItem.find(itemB => item.id === itemB.id).count }));
    const [newCartItem, setNewCartItem] = useState(newProductionData);
    const dispatch = useDispatch();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteID, setDeleteID] = useState<string | number | boolean | undefined>();

    useEffect(() => {
        const updateCartItem = newCartItem.map((item) => ({ id: item.id, count: item.count }));
        dispatch(setCartItem(updateCartItem))
    }, [newCartItem])

    const handlerMinusAndPlus = (type: string, id: number) => {
        switch (type) {
            case "plus":
                setNewCartItem(
                    newCartItem.map((item) => {
                        if (item.id === id) {
                            return { ...item, count: item.count + 1 }
                        }
                        return item;
                    })
                );
                break;
            case "minus":
                let checkCount = newCartItem.find(item => item.id === id).count;
                if (checkCount - 1 > 0) {
                    setNewCartItem((prev) => {
                        return prev.map((item) => {
                            if (item.id === id) {
                                return { ...item, count: item.count - 1 }
                            }
                            return item;
                        })
                    });
                } else {
                    setDialogOpen(true);
                    setDeleteID(id);
                }
                break;
        }
    }

    const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        let v = parseInt(event.target.value);
        if (isNaN(v) || !v) {
            setNewCartItem(
                newCartItem.map((item) => {
                    if (item.id === id) {
                        return { ...item, count: 1 }
                    }
                    return item;
                })
            );
        } else {
            setNewCartItem(
                newCartItem.map((item) => {
                    if (item.id === id) {
                        return { ...item, count: parseInt(event.target.value) }
                    }
                    return item;
                })
            );
        }
    }

    const handleClose = () => {
        setDialogOpen(false);
    }

    const handleDialogConfirm = () => {
        setNewCartItem(
            newCartItem.filter((item) => {
                if (item.id !== deleteID) {
                    return { ...item, count: 1 }
                }
            })
        );
        setDialogOpen(false);
    }

    return (
        <Layout>
            <Head>
                <title>購物車</title>
            </Head>
            <CssBaseline />
            <Container maxWidth="lg">
                {
                    cartItem.length == 0 ?
                        <Stack sx={{ width: '100%', margin: "1.5rem 0" }} spacing={2}>
                            <Alert icon={false} variant="outlined">您的購物車裡還沒有任何商品。</Alert>
                        </Stack>
                        :
                        <TableContainer component={Paper} sx={{ margin: "1.5rem 0" }}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>商品</TableCell>
                                        <TableCell>價格</TableCell>
                                        <TableCell>數量</TableCell>
                                        <TableCell>小計</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {newCartItem.map((row, index) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" onClick={() => { setDeleteID(row.id); setDialogOpen(true); }}>
                                                <DeleteForeverIcon color="error" sx={{ cursor: 'pointer' }} />
                                            </TableCell>
                                            <TableCell><Image
                                                src={`/images/products/${row.img}`}
                                                width={50}
                                                height={50}
                                                alt=""
                                            /></TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.price}</TableCell>
                                            <TableCell>
                                                <CartCountBtn
                                                    handlerMinus={() => handlerMinusAndPlus("minus", row.id)}
                                                    handlerPlus={() => handlerMinusAndPlus("plus", row.id)}
                                                    handlerInputChange={(e) => handlerInputChange(e, row.id)}
                                                    min={0}
                                                    value={row.count}
                                                />
                                            </TableCell>
                                            <TableCell>NT${row.count * row.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                }

            </Container>
            <DialogCommon
                open={dialogOpen}
                handleClose={handleClose}
                title="系統訊息"
                action={
                    <>
                        <Button onClick={handleClose}>取消</Button>
                        <Button onClick={handleDialogConfirm} autoFocus>
                            確定
                        </Button>
                    </>
                }
            >
                <>請確認是否要從購物車內移除此項目？</>
            </DialogCommon>
        </Layout >
    )
}