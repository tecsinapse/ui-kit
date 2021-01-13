import * as React from 'react';
import { ArgsTable, Description, Title } from '@storybook/addon-docs/blocks';
import { GROUPS } from 'hierarchySeparators';
import { FolderBreadcrumb } from 'components/Files';
import { DivFlex } from 'components/DivFlex';

export default {
  title: `${GROUPS.FILES}/Folder Breadcrumb`,
  component: FolderBreadcrumb,
  decorators: [
    Story => (
      <DivFlex>
        <Story />
      </DivFlex>
    ),
  ],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            The `FolderBreadcrumb` component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => {
  const breadcrumbs = [
    'Home',
    'Users',
    {
      title: 'Jane',
      component: 'a',
      componentProps: {
        href: 'http://google.com.br',
      },
    },
  ];
  return <FolderBreadcrumb {...args} breadcrumbs={breadcrumbs} />;
};
