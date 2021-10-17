// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fetch from 'node-fetch';

const BASE_URL = process.env.BASE_URL
const headers = {
    "mode": "cors",
    "credentials": "include"
}

export default async (req, res) => {
    let statusCode, data, link;
    try {
        link = req.url.split('api?u=')
        link = link[link.length - 1]

        if (!link) {
            statusCode = 400
            data = {
                rs: [],
                success: false,
                message: "=))"
            };
        } else {
            const response = await fetch(BASE_URL + link, {headers});
            const body = await response.json();
            statusCode = response.status
            data = {
                rs: body,
                success: response.ok,
                message: "OK"
            };
        }
    } catch (e) {
        console.error(e)
        statusCode = 500
        data = {
            rs: [],
            message: "Something error!",
            success: false
        };
    }

    res.statusCode = statusCode
    res.json(data)
}
