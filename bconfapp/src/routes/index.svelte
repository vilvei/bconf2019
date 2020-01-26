<script context="module">
export async function preload() {

  const data = (await getPresentations(this))
    .sort((a, b) => {
        if (isBefore(a.datetime, b.datetime)) { return -1; }
        if (isAfter(a.datetime, b.datetime)) { return 1; }
        return 0;
      });

	const gather = (array, starttime, quittime, locations) => {
    if (array.length === 0) { return []; }

    let runtime = parse(starttime, 'HH.mm', array[0].datetime);
    const endtime = parse(quittime, 'HH.mm', array[0].datetime);

		const retarr = [];
    const befPresentations = {};

		let max = 200; // sanity check
		while ((isAfter(endtime, runtime) || isEqual(endtime, runtime)) && max-- > 0) {

      const usetime = format(runtime, 'HH.mm');
      // console.log(' @@ '+ usetime);

			const onerow = [];
			for (const location of locations) {

				const nextloc = array.find(item => item.location === location && item.starttime === usetime);
				if (nextloc) {
					onerow.push(Object.assign({empty: false}, nextloc));
          befPresentations[location] = nextloc;
				}
				else {
          let addEmpty = true;
          if (befPresentations[location] &&
            befPresentations[location].duration >= 60 &&
            isAfter(addMinutes(befPresentations[location].datetime, befPresentations[location].duration), runtime)) {
              addEmpty = false;
          }

          if (addEmpty) {
  					onerow.push({
  						empty: true,
  						starttime: '',
  						category: '',
  						location: '',
  						name: '',
  						speaker: '',
  						duration: 30
  					});
          }
				}
			}

      retarr.push(...onerow);
      runtime = addMinutes(runtime, 30);
		}
		return retarr;
	}

  return {
    days: [
      gather(
  			data.filter(item => getDate(item.datetime) === 24),
  			'12.00', '20.00', ['theater', 'salon', 'spotlight']),

      gather(
        data.filter(item => getDate(item.datetime) === 25),
        '12.00', '20.00', ['theater', 'salon', 'spotlight']),

      gather(
        data.filter(item => getDate(item.datetime) === 26),
        '12.00', '20.00', ['theater', 'salon', 'spotlight'])
    ]
	};
}
</script>

<script>
import {
  parse, format, getDate, isBefore, isAfter, isEqual, getMinutes, addMinutes
} from 'date-fns/esm';
import ScheduleDay from '../components/ScheduleDay.svelte';
import { getPresentations } from '../presentations';
export let days;

export let selectedDay = 0;
export function select(num) {
  if (num !== selectedDay) {
    selectedDay = num;
    datestr = format(days[selectedDay][0].datetime, 'dd.MM.yyyy');
  }
}
export let datestr = format(days[selectedDay][0].datetime, 'dd.MM.yyyy');
</script>

<style>

.toolwrap {
  position: fixed;
  display: flex;
  justify-content: space-between;
  top: 105px;
  height: 35px;
  width: 100%;
  background-color: #313331;
  color: white;
  z-index: 5;
}

#tool {
  width: 50%;
  display: flex;
  justify-content: space-evenly;
}

.toolitem {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: 10px;
  font-size: 1.2rem;
  opacity: 1;
}

.toolitem:hover{
  color: white;
  background-color: lightgrey;
}

.tool-selected {
  color: black;
  background-color: white;
}

</style>

<svelte:head>
	<title>BConf 2019 Schedule</title>
</svelte:head>

<div class="toolwrap">
  <div id="tool">
    <div class="toolitem {selectedDay === 0 ? 'tool-selected' : ''}" on:pointerdown|preventDefault={() => select(0)}>Thursday</div>
    <div class="toolitem {selectedDay === 1 ? 'tool-selected' : ''}" on:pointerdown|preventDefault={() => select(1)}>Friday</div>
    <div class="toolitem {selectedDay === 2 ? 'tool-selected' : ''}" on:pointerdown|preventDefault={() => select(2)}>Saturday</div>
  </div>
  <div class="toolitem">{datestr}</div>
</div>
<!-- <div class="emptyline"></div> -->
<!-- <div class="dateline mc">{datestr}</div> -->
<ScheduleDay presentations={days[selectedDay]} />
