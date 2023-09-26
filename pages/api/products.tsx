import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { filter, id } = req.body;
    let data = [
        {
            id: 1,
            name: '測試圖片1',
            img: 'product1.jpg',
            price: 3000,
            desc: '<p>測試圖片說明</p><p>說明圖片說明圖片</p><p>測試圖片說明</p><p>說明圖片說明圖片</p>'
        },
        {
            id: 2,
            name: '測試圖片2',
            img: 'product2.jpg',
            price: 2000,
            desc: '<p>測試圖片說明</p><p>說明圖片說明圖片</p><p>測試圖片說明</p><p>說明圖片說明圖片</p>'
        },
        {
            id: 3,
            name: '測試圖片3',
            img: 'product3.jpg',
            price: 100,
            desc: '<p>測試圖片說明</p><p>說明圖片說明圖片</p><p>測試圖片說明</p><p>說明圖片說明圖片</p>'
        },
        {
            id: 4,
            name: '測試圖片4',
            img: 'product4.jpg',
            price: 500,
            desc: '<p>測試圖片說明</p><p>說明圖片說明圖片</p><p>測試圖片說明</p><p>說明圖片說明圖片</p>'
        },
        {
            id: 5,
            name: '測試圖片5',
            img: 'product5.jpg',
            price: 300,
            desc: '<p>測試圖片說明</p><p>說明圖片說明圖片</p><p>測試圖片說明</p><p>說明圖片說明圖片</p>'
        },
        {
            id: 6,
            name: '測試圖片6',
            img: 'product6.jpg',
            price: 200,
            desc: '<p>測試圖片說明</p><p>說明圖片說明圖片</p><p>測試圖片說明</p><p>說明圖片說明圖片</p>'
        },
        {
            id: 7,
            name: '測試圖片7',
            img: 'product7.jpg',
            price: 5000,
            desc: '<p>測試圖片說明</p><p>說明圖片說明圖片</p><p>測試圖片說明</p><p>說明圖片說明圖片</p>'
        }
    ]

    switch (req.method) {
        case "POST":
            if (filter) {
                data = data.map(item => item[filter])
            }
            else if (id) {
                data = data.filter(item => item.id == id);
            }
            break;
    }
    res.status(200).json(data);
}