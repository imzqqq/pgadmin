import React from 'react';
import '../helper/enzyme.helper';
import { createMount } from '@material-ui/core/test-utils';
import pgAdmin from 'sources/pgadmin';
import SchemaView from '../../../pgadmin/static/js/schema_view';
import BackupSchema, {getSectionSchema, getTypeObjSchema, getSaveOptSchema, getQueryOptionSchema, getDisabledOptionSchema, getMiscellaneousSchema} from '../../../pgadmin/tools/backup/static/js/backup.ui';
import Theme from '../../../pgadmin/static/js/theme';

describe('BackupSchema', ()=>{
  let mount;
  beforeAll(()=>{
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });
  let backupSchemaObj = new BackupSchema(
    ()=> getSectionSchema(),
    ()=> getTypeObjSchema(),
    ()=> getSaveOptSchema({nodeInfo: {server: {version: 11000}}}),
    ()=> getDisabledOptionSchema({nodeInfo: {server: {version: 11000}}}),
    ()=> getMiscellaneousSchema({nodeInfo: {server: {version: 11000}}}),
    {
      role: ()=>[],
      encoding: ()=>[],
    },
    {server: {version: 11000}},
    pgAdmin.pgBrowser,
    'backup_objects',
    []
  );

  it('create object backup', ()=>{
    mount(<Theme>
      <SchemaView
        formType='dialog'
        schema={backupSchemaObj}
        viewHelperProps={{
          mode: 'create',
        }}
        onSave={()=>{/*This is intentional (SonarQube)*/}}
        onClose={()=>{/*This is intentional (SonarQube)*/}}
        onHelp={()=>{/*This is intentional (SonarQube)*/}}
        onDataChange={()=>{/*This is intentional (SonarQube)*/}}
        confirmOnCloseReset={false}
        hasSQL={false}
        disableSqlHelp={false}
        disableDialogHelp={false}
      />
    </Theme>);
  });


  let backupSelectedSchemaObj = new BackupSchema(
    ()=> getSectionSchema(),
    ()=> getTypeObjSchema(),
    ()=> getSaveOptSchema({nodeInfo: {server: {version: 11000}}}),
    ()=> getDisabledOptionSchema({nodeInfo: {server: {version: 11000}}}),
    ()=> getMiscellaneousSchema({nodeInfo: {server: {version: 11000}}}),
    {
      role: ()=>[],
      encoding: ()=>[],
    },
    {server: {version: 11000}},
    pgAdmin.pgBrowser,
    'backup_objects',
    [{'id': 'public','name': 'public','icon': 'icon-schema', 'children': [{'id': 'public_table','name': 'table','icon': 'icon-coll-table','children': [{'id': 'public_test','name': 'test','icon': 'icon-table','schema': 'public','type': 'table','_name': 'public.test'}],'type': 'table','is_collection': true}],'is_schema': true}]
  );

  it('create selected object backup', ()=>{
    mount(<Theme>
      <SchemaView
        formType='dialog'
        schema={backupSelectedSchemaObj}
        viewHelperProps={{
          mode: 'create',
        }}
        onSave={()=>{/*This is intentional (SonarQube)*/}}
        onClose={()=>{/*This is intentional (SonarQube)*/}}
        onHelp={()=>{/*This is intentional (SonarQube)*/}}
        onDataChange={()=>{/*This is intentional (SonarQube)*/}}
        confirmOnCloseReset={false}
        hasSQL={false}
        disableSqlHelp={false}
        disableDialogHelp={false}
      />
    </Theme>);
  });


  let backupServerSchemaObj = new BackupSchema(
    ()=> getSectionSchema(),
    ()=> getTypeObjSchema(),
    ()=> getSaveOptSchema({nodeInfo: {server: {version: 11000}}}),
    ()=> getDisabledOptionSchema({nodeInfo: {server: {version: 11000}}}),
    ()=> getMiscellaneousSchema({nodeInfo: {server: {version: 11000}}}),
    {
      role: ()=>[],
      encoding: ()=>[],
    },
    {server: {version: 11000}},
    {serverInfo: {}},
    'server',
    []
  );

  it('create server backup', ()=>{
    mount(<Theme>
      <SchemaView
        formType='dialog'
        schema={backupServerSchemaObj}
        viewHelperProps={{
          mode: 'create',
        }}
        onSave={()=>{/*This is intentional (SonarQube)*/}}
        onClose={()=>{/*This is intentional (SonarQube)*/}}
        onHelp={()=>{/*This is intentional (SonarQube)*/}}
        onDataChange={()=>{/*This is intentional (SonarQube)*/}}
        confirmOnCloseReset={false}
        hasSQL={false}
        disableSqlHelp={false}
        disableDialogHelp={false}
      />
    </Theme>);
  });
});

