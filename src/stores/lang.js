import { writable } from 'svelte/store';
export const lang = writable({
  supported:["fr","en"],
  current: "en"
});
