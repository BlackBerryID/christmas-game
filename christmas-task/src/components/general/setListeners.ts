import { Sort } from '../main/sort';
import { Filters } from '../main/filters';
import { Select } from '../main/selectCards';
import { Buttons } from '../main/buttons';

const sort = new Sort();
sort.addListener();

const filters = new Filters();
filters.addListener();

const select = new Select();
select.addListener();

const buttons = new Buttons();
buttons.addListener();
