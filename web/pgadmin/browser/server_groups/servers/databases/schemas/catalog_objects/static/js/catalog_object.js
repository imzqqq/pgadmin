import CatalogObjectSchema from './catalog_object.ui';

define('pgadmin.node.catalog_object', [
  'sources/gettext', 'sources/pgadmin',
  'pgadmin.browser', 'pgadmin.browser.collection',
], function(gettext, pgAdmin, pgBrowser) {

  if (!pgBrowser.Nodes['coll-catalog_object']) {
    pgAdmin.Browser.Nodes['coll-catalog_object'] =
      pgAdmin.Browser.Collection.extend({
        node: 'catalog_object',
        label: gettext('Catalog Objects'),
        type: 'coll-catalog_object',
        columns: ['name', 'owner', 'description'],
        canDrop: false,
        canDropCascade: false,
      });
  }

  if (!pgBrowser.Nodes['catalog_object']) {
    pgAdmin.Browser.Nodes['catalog_object'] = pgAdmin.Browser.Node.extend({
      parent_type: 'catalog',
      type: 'catalog_object',
      label: gettext('Catalog Object'),
      hasSQL:  false,
      hasScriptTypes: [],
      hasDepends: true,
      init: function() {
        /* Avoid mulitple registration of menus */
        if (this.initialized)
          return;

        this.initialized = true;

      },
      getSchema: ()=>new CatalogObjectSchema(),

    });

  }

  return pgBrowser.Nodes['catalog_object'];
});
