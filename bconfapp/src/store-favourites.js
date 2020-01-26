// store.js
import { writable } from 'svelte/store';

const createWritableStore = (key) => {
  const { subscribe, set } = writable([]);

	return {
    subscribe,
    set,
    useLocalStorage: () => {
      if (typeof window !== 'undefined') {
        const json = localStorage.getItem(key);
        if (json) {
          set(JSON.parse(json));
        }
      }

      subscribe(current => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(key, JSON.stringify(current));
        }
      });
    }
  };
}

export const favourites = createWritableStore('favourites');
