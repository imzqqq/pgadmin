import React from 'react';
import '../helper/enzyme.helper';
import { createMount } from '@material-ui/core/test-utils';
import SchemaView from '../../../pgadmin/static/js/schema_view';
import BaseUISchema from 'sources/schema_view/base_schema.ui';
import GrantWizardPrivilegeSchema from '../../../pgadmin/tools/grant_wizard/static/js/privilege_schema.ui';
import {genericBeforeEach} from '../genericFunctions';
import Theme from '../../../pgadmin/static/js/theme';

class MockSchema extends BaseUISchema {
  get baseFields() {
    return [];
  }
}

describe('GrantWizard', () => {
  let mount;
  let schemaObj = new GrantWizardPrivilegeSchema(
    () => new MockSchema(),
  );

  /* Use createMount so that material ui components gets the required context */
  /* https://material-ui.com/guides/testing/#api */
  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  beforeEach(() => {
    genericBeforeEach();
  });

  it('create', () => {
    mount(<Theme>
      <SchemaView
        formType='dialog'
        schema={schemaObj}
        viewHelperProps={{
          mode: 'create',
        }}
        onDataChange={() => {/*This is intentional (SonarQube)*/}}
        showFooter={false}
        isTabView={false}
      />
    </Theme>);
  });
});

