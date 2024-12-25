import { fetchHandler } from './handler/fetch';
import { emailHandler } from './handler/mail';
import './polyfill';

export default {
    fetch: fetchHandler,
    email: emailHandler,
};
