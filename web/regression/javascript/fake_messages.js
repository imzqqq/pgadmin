//////////////////////////////////////////////////////////////////////////
//
// pgAdmin 4 - PostgreSQL Tools
//
// Copyright (C) 2013 - 2021, The pgAdmin Development Team
// This software is released under the PostgreSQL Licence
//
//////////////////////////////////////////////////////////////////////////

define('pgadmin.browser.messages',['sources/pgadmin'], function(pgAdmin) {
  var pgBrowser = pgAdmin.Browser = pgAdmin.Browser || {};

  if (pgBrowser.messages)
    return pgBrowser.messages;

  pgBrowser.messages = {
    'CANNOT_BE_EMPTY': '\'%s\' cannot be empty.',
  };
  return pgBrowser;
});