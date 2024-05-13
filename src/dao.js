import './types.js';

/**
 * Parse json string to array.
 *
 * @param {string} raw - The raw string.
 * @return {string[]} The parsed array.
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
  const addresses = [
    message.from,
    message.to
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
      if (item === address) {
        return true;
      }
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
    LDISABLE_OAD_REGEX_FROM_DB,
    DB,
  } = env;
  const blockList = loadArrayFromRaw(BLOCK_LIST);
  const whiteList = loadArrayFromRaw(WHITE_LIST);
  if (!(LDISABLE_OAD_REGEX_FROM_DB === 'true')) {
    blockList.push(...(await loadArrayFromDB(DB, 'BLOCK_LIST')));
    whiteList.push(...(await loadArrayFromDB(DB, 'WHITE_LIST')));
  }
  const result = {}
  
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
