export const updateObject = (oldOject, othersProperties) => {
    return {
        ...oldOject,
        ...othersProperties,
    };
};
