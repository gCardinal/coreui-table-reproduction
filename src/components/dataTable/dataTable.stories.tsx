import { ComponentMeta } from '@storybook/react';
import { CContainer } from '@coreui/react-pro';
import React from 'react';
import { DataTable as DataTableComponent } from './dataTable';
import { randFirstName } from '@ngneat/falso';

export default {
  title: 'Components/DataTable',
  component: DataTableComponent,
} as ComponentMeta<typeof DataTableComponent>;

const Template = ({ itemsPerPage, ...args }) => {
  const items = [];
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
  ];

  for (let i = 0; i < args.items; i++) {
    const firstName = randFirstName();
    const item: Record<string, any> = {
      id: i,
      name: firstName,
    };

    items.push(item);
  }

  return (
    <CContainer>
      <h1>DataTable</h1>
      <DataTableComponent
        columns={columns}
        items={items}
        itemsPerPage={itemsPerPage}
      />
    </CContainer>
  );
};

export const DataTable = Template.bind({});

DataTable.args = {
  itemsPerPage: 10,
  items: 50,
};

DataTable.argTypes = {
  itemsPerPage: {
    control: {
      type: 'range',
      min: 0,
      max: 20,
    },
  },
  items: {
    control: {
      type: 'range',
      min: 0,
      max: 200,
    },
  },
  columns: {
    table: {
      disable: true,
    },
  },
};
