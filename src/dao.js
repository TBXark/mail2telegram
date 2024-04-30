import './types.js';

/**
 * Parse json string to array.
 *
 * @param {string} raw - The raw string.
 * @return {*[]}
 */
function loadArrayFromRaw(raw) {
  if (!raw) {
    return [];
  }
  let list = [];
  try {
    list = JSON.parse(raw);
  // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return [];
  }
  if (!Array.isArray(list)) {
    return [];
  }
  return list;
}
/**
 * Loads a list from the database.
 *
 * @param {Database} db - The database object.
 * @param {string} key - The key of the database.
 * @return {Promise<string[]>}
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
 * Checks if the given message should be blocked.
 *
 * @param {EmailMessage} message - The message to be checked.
 * @param {Environment} env - The environment object containing BLOCK_LIST and WHITE_LIST.
 * @return {Promise<boolean>} A promise that resolves to true if the message can be handled.
 */
export async function isMessageBlock(message, env) {
  const matchAddress = (list, address) => {
    for (const item of list) {
      const regex = new RegExp(item);
      if (regex.test(address)) {
        return true;
      }
    }
    return false;
  };
  const {
    BLOCK_LIST,
    WHITE_LIST,
    LOAD_REGEX_FROM_DB,
    DB,
  } = env;
  const blockList = loadArrayFromRaw(BLOCK_LIST);
  const whiteList = loadArrayFromRaw(WHITE_LIST);
  if (LOAD_REGEX_FROM_DB === 'true') {
    blockList.push(...(await loadArrayFromDB(DB, 'BLOCK_LIST')));
    whiteList.push(...(await loadArrayFromDB(DB, 'WHITE_LIST')));
  }
  const address = [];
  if (message.from) {
    address.push(message.from);
  }
  if (message.to) {
    address.push(message.to);
  }
  for (const addr of address) {
    if (!matchAddress(whiteList, addr)) {
      if (matchAddress(blockList, addr)) {
        return true;
      }
    }
  }
  return false;
}

/**
 *
 * @param {string} id - The ID of the email.
 * @param {boolean} guardian - The guardian mode.
 * @param {Database} db - The database object.
 * @return {Promise<EmailHandleStatus>} The mail status.
 */
export async function loadMailStatus(id, guardian, db) {
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
 * @param {string} id - The ID of the email.
 * @param {Database} db - The database object.
 * @return {Promise<EmailCache|null>}
 */
export async function loadMailCache(id, db) {
  try {
    return JSON.parse(await db.get(id));
  } catch (e) {
    console.error(e);
  }
  return null;
}
