import { fetchMessages, MESSAGES_SLICE_NAME } from './init';

export const getMessages = (state) => state[MESSAGES_SLICE_NAME].messages;
export const getIsMessagesRequesting = (state) =>
  fetchMessages.selector.isRequesting(state[MESSAGES_SLICE_NAME]);
export const getMessagesRequestError = (state) =>
  fetchMessages.selector.error(state[MESSAGES_SLICE_NAME]);

export const getMessagesSlice = (state) => ({
  data: getMessages(state),
  error: getMessagesRequestError(state),
  isFetching: getIsMessagesRequesting(state),
});

export const getCounter = (state) => state[MESSAGES_SLICE_NAME].counter;
