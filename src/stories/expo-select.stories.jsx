import React from 'react';
import ExpoSelect from '../components/ui/expo-select/expo-select';
import { statusMap } from '../api/common';

export default {
  title: 'Components/ExpoSelect',
  component: ExpoSelect,
  // Setup default “props” or controls
  args: {
    value: '0',
    items: Object.values(statusMap),
    className: 'w-[180px]',
  },
  argTypes: {},
};

export const Default = (args) => <ExpoSelect {...args} />;
