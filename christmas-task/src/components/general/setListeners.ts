import { Sort } from '../main/sort';
import { Filters } from '../main/filters';

const sort = new Sort();
sort.addListener();

const filters = new Filters();
filters.addListener();
