import _ from 'lodash';
import requestBase from 'src/features/request/request';

// TODO: this creates a circular dependency
import store from 'src/features/store';

const BASE = 'https://api.wanikani.com/v2/';

export const request = async opts => {

  const {
    apiKey,
    endpoint,
    params,
    body,
    method,
    nextUrl,
  } = opts;

  const useApiKey = apiKey || store.getState().session.token;
  const finalUrl = nextUrl || `${BASE}${endpoint}`;

  // make the request
  return await requestBase(method, finalUrl, {
    body,
    params: !nextUrl ? params : null,
    headers: { Authorization: `Bearer ${useApiKey}` },
    hasError: res => res.error ? res : null,
  })
}

// get an entire collection

export const collection = async (opts = {}, col = []) => {
  
  // initiate request
  const response = await request(opts)

  // get cursor from response
  const data = col.concat(_.get(response, 'data') || []);
  const next = _.get(response, 'pages.next_url');

  // if there is a next page, recurse and pass the collection on to
  // the next call, otherwise return with the current state of data
  return next
    ? await collection({ ...opts, nextUrl: next, }, data)
    : data;

}
