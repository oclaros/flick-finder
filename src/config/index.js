import keyMirror from 'keymirror'
export const MOVIE_LIST_TYPE = keyMirror({ default: null, upcoming: null});
export const MOVIE_CONTAINER_TYPE = keyMirror({ movieContainer: null, upcomingMovieContainer: null});
export const MOVIE_CONTAINER_LAYOUT_TYPE = keyMirror({movieContainerSolo: null, movieContainerDuo :null})
export const API_BASE_STRING = 'https://api.themoviedb.org/3/';
export const API_DISCOVER = 'discover/movie';
export const API_NOW_PLAYING = API_BASE_STRING +'movie/now_playing?';
export const API_UPCOMING_MOVIES = API_BASE_STRING + 'movie/upcoming?';
export const API_BASE_MOVIE_QUERY = API_BASE_STRING + 'movie/';
export const API_BASE_SEARCH_MOVIE = API_BASE_STRING + 'search/movie';
export const LANG_STRING = 'language=en-US';

