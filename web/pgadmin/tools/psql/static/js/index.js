import gettext from 'sources/gettext';
import url_for from 'sources/url_for';
import _ from 'lodash';
import pgAdmin from 'sources/pgadmin';
import pgBrowser from 'top/browser/static/js/browser';
import * as csrfToken from 'sources/csrf';
import {initialize} from './psql_module';

let pgBrowserOut = initialize(gettext, url_for, _, pgAdmin, csrfToken, pgBrowser);

module.exports = {
  pgBrowser: pgBrowserOut,
};
