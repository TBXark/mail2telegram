import { loadArrayFromRaw } from './utils.js';

import './types.js';

export const BLOCK_LIST_KEY = 'BLOCK_LIST';
export const WHITE_LIST_KEY = 'WHITE_LIST';

/**
 * Loads a list from the database.
 * @param {Database} db - The database object.
 * @param {string} key - The key of the database.
 * @returns {Promise<string[]>}
 */
export async function loadArrayFromDB(db, key) {
    try {
        const raw = await db.get(key);
        return loadArrayFromRaw(raw);
    } catch (e) {
        console.error(e);
    }
    return [];
}

/**
 * Adds an address to the database.
 * @param {Database} db - The database object.
 * @param {string} address - The address to be added.
 * @param {string} type - The type of the address.
 * @returns {Promise<void>}
 */
export async function addAddress(db, address, type) {
    const list = await loadArrayFromDB(db, type);
    list.unshift(address);
    await db.put(type, JSON.stringify(list));
}

/**
 * Removes an address from the database.
 * @param {Database} db - The database object.
 * @param {string} address - The address to be removed.
 * @param {string} type - The type of the address.
 * @returns {Promise<void>}
 */
export async function removeAddress(db, address, type) {
    const list = await loadArrayFromDB(db, type);
    const result = list.filter(item => item !== address);
    await db.put(type, JSON.stringify(result));
}

/**
 * Loads the status of the email.
 * @param {Database} db - The database object.
 * @param {string} id - The ID of the email.
 * @param {boolean} guardian - The guardian mode.
 * @returns {Promise<EmailHandleStatus>} The mail status.
 */
export async function loadMailStatus(db, id, guardian) {
    const defaultStatus = {
        telegram: false,
        forward: [],
    };
    if (guardian) {
        try {
            return {
                ...defaultStatus,
                ...JSON.parse(await db.get(id)),
            };
        } catch (e) {
            console.error(e);
        }
    }
    return defaultStatus;
}

/**
 * Loads the cache of the email.
 * @param {Database} db - The database object.
 * @param {string} id - The ID of the email.
 * @returns {Promise<EmailCache|null>}
 */
export async function loadMailCache(db, id) {
    try {
        return JSON.parse(await db.get(id));
    } catch (e) {
        console.error(e);
    }
    return null;
}
