

import { pool } from "@/lib/pg";


export async function GET(Request) {

    // Database access
    const data = await pool.query("SELECT * FROM complaint");

    return new Response("Fsfsaf")
}

export async function POST(Request) {
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

    return new Response("Fsfsaf")
}
