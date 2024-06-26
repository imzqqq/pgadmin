import os
from pgadmin.utils.route import BaseTestGenerator
from regression.python_test_utils import test_utils as utils
from regression.test_setup import config_data
from regression import parent_node_dict
import json
import config

test_user_details = None
if config.SERVER_MODE:
    test_user_details = config_data['pgAdmin_test_non_admin_credentials']

CURRENT_PATH = os.path.dirname(os.path.realpath(__file__))
with open(CURRENT_PATH + "/preferences_test_data.json") as data_file:
    test_cases = json.load(data_file)


class GetPreferencesTest(BaseTestGenerator):
    """
    This class will fetch all Preferences
    """

    scenarios = utils.generate_scenarios('update_preferences', test_cases)

    def setUp(self):
        response = self.tester.get(self.url,
                                   content_type='html/json')
        self.assertTrue(response.status_code, 200)
        parent_node_dict['preferences'] = response.data

    def runTest(self):
        self.update_preferences()

    def update_preferences(self):
        if 'preferences' in parent_node_dict:
            data = \
                json.loads(parent_node_dict['preferences'])[0]['children'][0][
                    'preferences'][0]
            updated_data = [{
                'id': data['id'],
                'category_id': data['cid'],
                'mid': data['mid'],
                'name': data['name'],
                'value': not data['value']
            }]
            response = self.tester.put(self.url,
                                       data=json.dumps(updated_data),
                                       content_type='html/json')
            self.assertTrue(response.status_code, 200)
        else:
            self.fail('Preferences not found')
