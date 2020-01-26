let speakers;

async function getSpeakers(that) {
  if (Array.isArray(speakers)) {
    return speakers;
  }
  const res = await that.fetch('__datasource__/speakers.json');
  const now = new Date();
  const data = await res.json();
  speakers = data.sort((a, b) => {
    if (a.name < b.name) { return -1; }
    if (a.name > b.name) { return 1; }
    return 0;
  });
  return speakers;
}

export { getSpeakers };
