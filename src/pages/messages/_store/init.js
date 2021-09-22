import { Slice } from '@@/libs/store/slice';

const messagesSlice = new Slice('messages');

export const fetchMessages = messagesSlice.create('fetchMessages', {
  async: true,
});

export const rndCounter = messagesSlice.create('rndCounter');
export const incrementCounter = messagesSlice.create('incrementCounter');
export const decrementCounter = messagesSlice.create('decrementCounter');

export const asyncCounter = messagesSlice.create('asyncCounter', {
  async: true,
});

// console.log('slice Cases: ', messagesSlice.cases);
// console.log('slice Actions: ', messagesSlice.actions.decrementCounter);

export const { actions, name: MESSAGES_SLICE_NAME } = messagesSlice;
