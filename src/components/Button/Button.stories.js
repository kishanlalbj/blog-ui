import React from 'react';
import Button from './Button';

export default {
  title: 'form/Button',
  component: Button
};

const Template = (args) => <Button {...args}></Button>;

export const Primary = Template.bind({});

Primary.args = {
  label: 'Primary',
  variant: 'primary',
  size: 'md',
  onClick: () => console.log('clicked')
};

export const Secondary = Template.bind({});

Secondary.args = {
  label: 'Secondary',
  variant: 'secondary',
  size: 'md',
  onClick: () => console.log('clicked')
};

export const Warning = Template.bind({});

Warning.args = {
  label: 'Warning',
  variant: 'warning',
  size: 'md',
  onClick: () => console.log('clicked')
};

export const Transparent = Template.bind({});

Transparent.args = {
  label: 'Transparent',
  variant: 'transparent',
  size: 'md',
  onClick: () => console.log('clicked')
};
