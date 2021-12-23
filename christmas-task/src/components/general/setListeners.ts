import { Sort } from '../filters/sort';
import { Filters } from '../filters/filters';
import { Select } from '../cards/selectCards';
import { Buttons } from '../filters/buttons';
import { Search } from '../header/search';
import { LocalStorage } from '../localStorage/storage';

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
