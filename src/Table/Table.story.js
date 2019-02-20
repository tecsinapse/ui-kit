import { storiesOf } from '@storybook/react';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import SimpleTable from './SimpleTable';
import FilteringTable from './FilteredTable';
import SelectionTable from './SelectionTable';

storiesOf(`${GROUPS.COMPONENTS}|Table`, module)
  .add('Simple Table', SimpleTable)
  .add('Filtering Table', FilteringTable)
  .add('Selection Table', SelectionTable);
