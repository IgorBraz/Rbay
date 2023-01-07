import type { Session } from '$services/types';
import { sessionsKey } from '$services/keys';
import { client } from '$services/redis';
import { debug } from 'svelte/internal';

export const getSession = async (id: string) => {
    debug;
    const session = await client.hGetAll(sessionsKey(id));

    if (Object.keys(session).length === 0) {
        return null;
    }

    return deserialize(id, session);
};

export const saveSession = async (session: Session) => {
    return client.hSet(sessionsKey(session.id), serialize(session));
};

export const deserialize = (id: string, session: { [key: string]: string }) => {
    return {
        id,
        userId: session.userId,
        username: session.username
    };
};

export const serialize = (session: Session) => {
    return {
        userId: session.userId,
        username: session.username
    };
};