
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

import { pool } from "@/lib/pg";

const quiz = [
    {
        id: 1,
        question: 'What is the capital of India?',
        options: [
            'New Delhi',
            'Mumbai',
            'Kolkata',
            'Chennai',
        ],
        answer: 'New Delhi',
    },
    {
        id: 2,
        question: 'What is the capital of USA?',
        options: [
            'New York',
            'Washington DC',
            'Los Angeles',
            'Chicago',
        ],
        answer: 'Washington DC',
    }
]

export default async function handler(req, res) {

    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        res.status(401).json({ message: 'Unauthorized' })
        return;
    }

    console.log(session)

    if (req.method === 'GET') {

        // Database access
        const data = {
            rows: quiz,
        }

        res.status(200).json({
            message: 'Successfully fetched quiz',
            data: data?.rows,
        })
    }
    else if (req.method === 'POST') {
        const answerList = req.body.answerList;
        const userId = 'temp';

        if (!answerList || answerList === '' || answerList === undefined) {
            res.status(400).json({ message: 'Invalid answerList' })
            return;
        }

        // Database access

        res.status(200).json({
            message: 'Successfully analyzed quiz',
            data: {
                score: 2,
                analysis: "Bro has depresssion"
            },
        })
    }
    else if (req.method === 'PUT') {
        res.status(200).json({ name: 'Update a complaint' })
    }
    else if (req.method === 'DELETE') {
        res.status(200).json({ name: 'Delete a complaint' })
    }
}
