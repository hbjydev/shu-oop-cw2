import { createParamDecorator } from '@nestjs/common';
import * as httpContext from 'express-http-context';

export const Voter = createParamDecorator(() => {
  const voter = httpContext.get('voter');
  return voter;
});
