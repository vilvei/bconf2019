/**
Convert blender conference schedule webpage into json database-structure.
*/
const minimist = require('minimist');
const args = minimist(process.argv.slice(2), {boolean: ['h', 'help', 'fetch', 'save']});
if (args.h || args.help) {
  console.log(
`converts fetched Blender conference 2019 html schedule page into json.`);
  process.exit();
}

const fsp = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { parse, setMinutes, isBefore, isAfter } = require('date-fns');


const fetchSchedule = async () => {

  const scheduleUrl = 'https://conference.blender.org/2019/schedule/';
  console.log(scheduleUrl);
  const resp = await fetch(scheduleUrl);
  if (!resp.ok) { return Promise.reject(resp.statusText); }

  const allEvents = [];
  const now = new Date();
  const repe = new RegExp(/\s{2,}/, 'g');

  const ch = cheerio.load(await resp.text());
  const events = ch('div.event-cell');

  events.each((ind, evecell) => {
    const onecell = ch(evecell);
    if (onecell.attr('data-no-events')) {
      return true;
    }

    const hhmm = onecell.find('div.time-header').text().trim().split(':');
    let datetimestr = onecell.attr('data-day-hour');// +' +0200';
    datetimestr += datetimestr.split('/').shift() === '26' ? ' +0100' : ' +0200';
    let datetime;
    try {
      datetime = setMinutes(
        parse(datetimestr , "dd'/'MM'/'yy', 'HH XX", now),
        parseInt(hhmm[1], 10));
    } catch (dateexp) { console.error(dateexp); }

    onecell.find('a.event').each((ind, eve) => {
      const one = ch(eve);
      const eventOb = {
        id: one.attr('id').split('-').pop(),
        datetime,
        location: one.attr('data-schedule-location'),
        category: one.attr('data-schedule-category'),

        name: one.find('div.event-name').text().trim().replace(repe, '. '),
        speaker: one.find('div.event-speakers').text().trim()
          .replace(repe, '\n').split('\n').join(', ').replace(/,,/g, ','),
        duration: parseInt(one.find('li.event-duration').text().trim().split(' ').shift(), 10)
      };

      allEvents.push(eventOb);
    });
  });

  console.log("presentation-count: "+ allEvents.length);
  return allEvents
    .sort((a, b) => {
      if (isBefore(a.datetime, b.datetime)) { return -1; }
      if (isAfter(a.datetime, b.datetime)) { return 1; }
      return 0;
    })
}

const fetchSpeakers = async preses => {
  const speakers = [];
  const sids = {};

  for (const prese of preses) {
    if (!prese.speakerId || sids[prese.speakerId]) { continue; }
    const profileUrl = 'https://conference.blender.org/profile/'+ prese.speakerId;
    console.log(profileUrl);
    const resp = await fetch(profileUrl);
    if (!resp.ok) { continue; }

    const ch = cheerio.load(await resp.text());
    // const name = ch('span.float-left').text().trim();
    // const role = ch('span.lead').text().trim();
    // const organisation = ch('h5').text().trim();
    // const description = ch('div.lead').text().trim();
    // const imageUrl = ch('img').attr('src');
    // const purl = ch('p.pt-2').find('a').attr('href');
    speakers.push({
      id: prese.speakerId,
      name: ch('span.float-left').text().trim(),
      role: ch('span.lead').text().trim(),
      organisation: ch('h5').text().trim(),
      description: ch('div.lead').text().trim(),
      imageUrl: ch('img').attr('src'),
      purl: ch('p.pt-2').find('a').attr('href')
    });
    sids[prese.speakerId] = true;
  }
  console.log("speaker-count: "+ speakers.length);
  return speakers;
}

const fetchDescriptions = async presentations => {
  const uribase = 'https://conference.blender.org/2019/presentations/';

  for (const prese of presentations) {
    try {

      const preseUrl = uribase + prese.id;
      console.log(preseUrl);
      const resp = await fetch(preseUrl);
      if (!resp.ok) { return Promise.reject(resp.statusText); }

      const ch = cheerio.load(await resp.text());
      prese.description = ch('p').text().trim();

      ch('a').each((ind, ach) => {
        const aelem = ch(ach);
        const href = aelem.attr('href');
        if (href.startsWith('/profile/')) {
          prese.speakerId = href.split('/').filter(h => h).pop();
          return false;
        }
      });

    } catch (exp) {
      console.error(`+ Fail with ${prese.id}: ${presen.name}: `+ exp);
    }
  }
  return presentations;
}

const writeJson = async (text, filename) => {
  console.log("writing "+ filename);
  return fsp.writeFile(filename, JSON.stringify(text, null, 2));
}

const doit = async () => {
  const presentations = await fetchDescriptions(await fetchSchedule());
  const speakers = await fetchSpeakers(presentations);
  const outputdir = path.join(path.dirname(process.argv[1]), '..', '..', 'data');
  await writeJson(presentations, path.join(outputdir, 'presentations.json'));
  return writeJson(speakers, path.join(outputdir, 'speakers.json'));
}

doit()
  .then(() => console.log('done'))
  .catch(exp => console.error(exp));
