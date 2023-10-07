import { StoryFn } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export function RouteDecorator (StoryComponent: StoryFn): JSX.Element {
  return (
    <BrowserRouter>
      <StoryComponent />
    </BrowserRouter>
  );
}