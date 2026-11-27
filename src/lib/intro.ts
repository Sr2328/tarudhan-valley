/**
 * In-memory flag: has the preloader intro already played in this browser session?
 * Lets the home page skip the intro (and its animation delays) when you come back to it
 * from a residence page, without a full reload.
 */
export const introState = { played: false };