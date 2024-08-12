/**
 * Parse json string to array.
 * @param {string} raw - The raw string.
 * @returns {string[]} The parsed array.
 */
export function loadArrayFromRaw(raw) {
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
