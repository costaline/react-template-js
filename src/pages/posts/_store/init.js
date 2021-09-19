import { SliceActionBuilder } from '@@/libs/store/SliceAction';

export const SLICE_NAME = 'posts';

const builder = new SliceActionBuilder(SLICE_NAME);

export const fetchPosts = builder.build('fetchPosts', { async: true });

export const rndCounter = builder.build('rndCounter');
export const incrementCounter = builder.build('incrementCounter');
export const decrementCounter = builder.build('decrementCounter');
export const asyncCounter = builder.build('asyncCounter', { async: true });
