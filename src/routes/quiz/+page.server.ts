import { RedisDB } from './../../lib/databaseInterfaces';
// import { createClient } from 'redis';
// import {
//     PRIVATE_REDIS_HOST,
//     PRIVATE_REDIS_PASSWORD
// } from '$env/static/private';
export const prerender = false
const course_id = 1
// const redisClient = await createClient({
//     password: PRIVATE_REDIS_PASSWORD,
//     socket: {
//         host: PRIVATE_REDIS_HOST,
//         port: 16571
//     }
// }).connect();

export async function load() {
    // const redisDB: any = await redisClient.json.get(`version:${course_id}`)
    const redisDB: RedisDB = {
        exam: {
            version: 10,
            timestamp: "2024-05-07 15:39:17.162808+00"
        },
        course: {
            version: 2,
            timestamp: "2024-05-07 15:39:17.162808+00"
        },
        collection: {
            version: 3,
            timestamp: "2024-05-07 15:39:17.162808+00"
        },
        answer: {
            version: 7,
            timestamp: "2024-05-01 12:44:11.124906+00"
        },
        question: {
            version: 2,
            timestamp: "2024-05-06 13:12:04.483203+00"
        },
        paragraph: {
            version: 2,
            timestamp: "2024-05-06 13:12:04.483203+00"
        },
        question_tag: {
            version: 1,
            timestamp: "2024-05-06 13:12:04.483203+00"
        },
        question_exam: {
            version: 2,
            timestamp: "2024-05-06 13:12:04.483203+00"
        },
        deleted_record: {
            version: 8,
            timestamp: "2024-05-13 20:50:02.03458+00"
        }
    }
    return { course_id, redisDB }
}


