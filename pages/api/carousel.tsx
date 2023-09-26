import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(
        [
            {
                id: 1,
                name: "Banner1.jpg"
            },
            {
                id: 2,
                name: "Banner2.jpg"
            },
            {
                id: 3,
                name: "Banner3.jpg"
            },
            {
                id: 4,
                name: "Banner4.jpg"
            },
            {
                id: 5,
                name: "Banner5.jpg"
            },
        ]
    );
}