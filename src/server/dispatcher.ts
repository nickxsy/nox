import type { NoxRequest } from './request.js';
import type { NoxResponse } from './response.js';
import type { Handler } from './types.js';

const FIRST_HANDLER_INDEX = 0;
const NEXT_HANDLER_OFFSET = 1;

export const dispatch = async (
  handlers: Handler[],
  request: NoxRequest,
  response: NoxResponse,
): Promise<void> => {
  const execute = async (index: number): Promise<void> => {
    const handler = handlers[index];

    if (!handler) {
      return;
    }

    let nextCalled = false;
    const next = async (): Promise<void> => {
      if (nextCalled) {
        return;
      }

      nextCalled = true;
      await execute(index + NEXT_HANDLER_OFFSET);
    };

    await handler(request, response, next);
  };

  await execute(FIRST_HANDLER_INDEX);
};