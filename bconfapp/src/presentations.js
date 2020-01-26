import { parse, format } from 'date-fns/esm';
let presentations;

async function getPresentations(that) {
  if (Array.isArray(presentations)) {
    return presentations;
  }
  const res = await that.fetch('__datasource__/presentations.json');
  const now = new Date();
  presentations = (await res.json()).map(item => {
    item.datetime = parse(item.datetime, "yyyy-MM-dd'T'HH:mm:ss.SSSXX", now);
    item.starttime = format(item.datetime, 'HH.mm');
    return item;
  });
  return presentations;
}

export { getPresentations };
