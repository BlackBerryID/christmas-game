import { Sort } from '../toysPage/filters/sort';
import { Filters } from '../toysPage/filters/filters';
import { Select } from '../toysPage/cards/selectCards';
import { Buttons } from '../toysPage/filters/buttons';
import { Search } from '../header/search';
import { LocalStorage } from '../localStorage/storage';
import Start from '../startPage/start';
import { Navigation } from '../header/nav';
import { Drag } from '../treePage/selected/drag';
import { Settings } from '../treePage/settings/settings';
import { Snow } from '../treePage/settings/snow';

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

const start = new Start();
start.addListener();

const nav = new Navigation();
nav.addListener();

const drag = new Drag();
drag.addListener();

const settings = new Settings();
settings.addListener();

const snow = new Snow();
snow.addListener();
