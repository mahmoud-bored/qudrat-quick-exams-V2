export const prerender = false

import { createClient } from 'redis';
import {
    PRIVATE_REDIS_HOST,
    PRIVATE_REDIS_PASSWORD
} from '$env/static/private';
import { redirect } from '@sveltejs/kit';


const course_id = 1
const redisClient = await createClient({
    password: PRIVATE_REDIS_PASSWORD,
    socket: {
        host: PRIVATE_REDIS_HOST,
        port: 16571
    }
}).connect();

export async function load() {
    const redisDB: any = await redisClient.json.get(`version:${course_id}`)
    const featureFlags: any = await redisClient.json.get(`feature-flag`)
    return { course_id, redisDB, featureFlags }
}


