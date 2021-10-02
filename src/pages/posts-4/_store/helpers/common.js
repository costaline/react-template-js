/**
 * @typedef {'start'|'success'|'failure'} ActionStatus
 */

/**
 *
 * @param slice
 * @returns {(function(string, ActionStatus=): string)}
 */
export const typeCreator = (slice) => {
  return (action, status) => {
    const base = `${slice} [${action}]`;

    if (status) return `${base} ${status}`;

    return base;
  };
};

/**/
/**
 *
 * @param actionType
 * @returns {{mode: ActionStatus, commonType: string}}
 */
export const parseType = (actionType) => {
  const [_, commonType, mode] =
    actionType.match(/\[(.+)\]\s(start|success|failure)$/) || [];

  return { commonType, mode };
};
