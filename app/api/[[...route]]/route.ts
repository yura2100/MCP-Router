import { handle } from 'hono/vercel'
import {app} from "@/server/app";

export const runtime = 'edge'

export const GET = handle(app);
export const POST = handle(app);
