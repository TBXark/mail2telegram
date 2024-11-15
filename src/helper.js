import { BLOCK_LIST_KEY, loadArrayFromDB, WHITE_LIST_KEY } from './dao.js';
import { loadArrayFromRaw } from './utils.js';

/**
 * @param {string} address - The address to be checked.
 * @param {string} pattern - The pattern to be checked.
 * @returns {boolean}
 */
function testAddress(address, pattern) {
    if (pattern.toLowerCase() === address.toLowerCase()) {
        return true;
    }
    try {
        const regex = new RegExp(pattern, 'i');
        return !!regex.test(address);
    } catch {
        return false;
    }
}

/**
 * Checks the status of an address by matching it against block and white lists.
 * @param {string[]} addresses - The address to be checked.
 * @param {Environment} env - The environment object containing BLOCK_LIST and WHITE_LIST.
 * @returns {object} - An object containing the status of the address.
 */
export async function checkAddressStatus(addresses, env) {
    const matchAddress = (list, address) => {
        for (const item of list) {
            if (!item) {
                continue;
            }
            if (testAddress(address, item)) {
                return true;
            }
        }
        return false;
    };
    const {
        BLOCK_LIST,
        WHITE_LIST,
        DISABLE_LOAD_REGEX_FROM_DB,
        DB,
    } = env;
    const blockList = loadArrayFromRaw(BLOCK_LIST);
    const whiteList = loadArrayFromRaw(WHITE_LIST);
    if (!(DISABLE_LOAD_REGEX_FROM_DB === 'true')) {
        blockList.push(...(await loadArrayFromDB(DB, BLOCK_LIST_KEY)));
        whiteList.push(...(await loadArrayFromDB(DB, WHITE_LIST_KEY)));
    }
    const result = {};

    for (const addr of addresses) {
        if (!addr) {
            continue;
        }
        if (matchAddress(whiteList, addr)) {
            result[addr] = 'white';
            continue;
        }
        if (matchAddress(blockList, addr)) {
            result[addr] = 'block';
            continue;
        }
        result[addr] = 'no_match';
    }
    return result;
}

/**
 * Checks if the given message should be blocked.
 * @param {EmailMessage} message - The message to be checked.
 * @param {Environment} env - The environment object containing BLOCK_LIST and WHITE_LIST.
 * @returns {Promise<boolean>} A promise that resolves to true if the message can be handled.
 */
export async function isMessageBlock(message, env) {
    const addresses = [
        message.from,
        message.to,
    ];
    const res = await checkAddressStatus(addresses, env);
    for (const key in res) {
        switch (res[key]) {
            case 'white':
                console.log(`Matched white list: ${key}`);
                return false;
            default:
                break;
        }
    }
    for (const key in res) {
        switch (res[key]) {
            case 'block':
                console.log(`Matched block list: ${key}`);
                return true;
            default:
                break;
        }
    }
    return false;
}
