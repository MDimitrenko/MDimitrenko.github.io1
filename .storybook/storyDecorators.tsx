import { StoryFn } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Theme from "../src/components/theme/Theme";

export function RouteDecorator (StoryComponent: StoryFn): JSX.Element {
  return (
      <Theme>
        <BrowserRouter>
          <StoryComponent />
        </BrowserRouter>
      </Theme>
  );
}