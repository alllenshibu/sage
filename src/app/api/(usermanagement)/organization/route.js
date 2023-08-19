import { pool } from '@/lib/pg';

export async function GET(Request) {

    // TODO: Check if authenticated

    // Database access
    const { rows } = await pool.query(`SELECT * FROM organization`);

    const response = {
        data: rows,
    }

    return new Response(JSON.stringify(response), {
        status: 200,
    })
}