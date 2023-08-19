
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

import { pool } from "@/lib/pg";


export default async function handler(req, res) {

    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        res.status(401).json({ message: 'Unauthorized' })
        return;
    }

    console.log(session)

    if (req.method === 'GET') {

        // Database access
        const data = await pool.query("SELECT * FROM complaint");

        res.status(200).json({
            message: 'Successfully fetched all complaints',
            data: data?.rows,
        })
    }
    else if (req.method === 'POST') {
        const title = req.body.title;
        const description = req.body.description;
        const userId = 'temp';

        if (!title || title === '' || title === undefined) {
            res.status(400).json({ message: 'Invalid title' })
            return;
        }

        if (!description || description === '' || description === undefined) {
            res.status(400).json({ message: 'Invalid description' })
            return;
        }

        // Database access
        const data = await pool.query("INSERT INTO complaint (title, description, user_id) VALUES ($1, $2, $3) RETURNING *", [title, description, userId]);

        res.status(200).json({
            message: 'Successfully created a complain',
            data: data?.rows[0],
        })
    }
    else if (req.method === 'PUT') {
        res.status(200).json({ name: 'Update a complaint' })
    }
    else if (req.method === 'DELETE') {
        res.status(200).json({ name: 'Delete a complaint' })
    }
}
