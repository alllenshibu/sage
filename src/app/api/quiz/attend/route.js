

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

export async function GET(Request) {
    // Database access
    const data = {
        rows: quiz,
    }

    return new Response("Fsfsaf")
}
export async function POST(Request) {

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

    return new Response("Fsfsaf")
}