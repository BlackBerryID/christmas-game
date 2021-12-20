import { Sort } from '../main/sort';
import { Filters } from '../main/filters';
import { Select } from '../main/selectCards';
import { Buttons } from '../main/buttons';
import { Search } from '../main/search';
import { LocalStorage } from '../main/storage';

const sort = new Sort();
sort.addListener();

const filters = new Filters();
filters.addListener();

const select = new Select();
select.addListener();

const buttons = new Buttons();
buttons.addListener();

const search = new Search();
search.addListener();

const storage = new LocalStorage();
storage.addListener();
