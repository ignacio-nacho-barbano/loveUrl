export const decodePrimitive = (value) => {
    if (value === '')
        return '';
    if (value === 'true')
        return true;
    if (value === 'false')
        return false;
    if (value === 'null')
        return null;
    if (value === 'undefined')
        return undefined;
    const number = Number(value);
    if (!Number.isNaN(number))
        return number;
    return decodeURIComponent(value.replaceAll('+', ' '));
};
export const encodeIfStringOrNull = (value) => {
    if (typeof value === 'string' || value === null)
        return encodeURIComponent(value);
    return value;
};
