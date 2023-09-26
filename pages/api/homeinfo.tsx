import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(
        [
            {
                id: 1,
                name: "HomeInfoImg1.jpg",
                description: "測試說明，從網路上抓到的圖片，看起來不錯所以抓下來當範例~測試圖片1",
            },
            {
                id: 2,
                name: "HomeInfoImg2.jpg",
                description: "測試說明，從網路上抓到的圖片，看起來不錯所以抓下來當範例~測試圖片2",
            },
            {
                id: 3,
                name: "HomeInfoImg3.jpg",
                description: "測試說明，從網路上抓到的圖片，看起來不錯所以抓下來當範例~測試圖片3",
            }
        ]
    );
}