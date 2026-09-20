const FIRST_CHARACTER_INDEX = 1;
const FIRST_PATH_LENGTH = 1;
const TRAILING_SLASH_PATTERN = /\/+$/u;

const normalizePath = (value: string): string => {
  if (value.length > FIRST_PATH_LENGTH) {
    return value.replace(TRAILING_SLASH_PATTERN, '');
  }

  return value;
};

const matchPart = (
  routeSegment: string | undefined,
  requestSegment: string | undefined,
  params: Record<string, string>,
): boolean => {
  if (routeSegment === '' && requestSegment === '') {
    return true;
  }

  if (!routeSegment || !requestSegment) {
    return false;
  }

  if (routeSegment.startsWith(':')) {
    const paramName = routeSegment.slice(FIRST_CHARACTER_INDEX);
    params[paramName] = requestSegment;
    return true;
  }

  return routeSegment === requestSegment;
};

const matchPath = (
  routePath: string,
  requestPath: string,
): Record<string, string> | undefined => {
  const params: Record<string, string> = {},
    requestSegments = normalizePath(requestPath).split('/'),
    routeSegments = normalizePath(routePath).split('/');

  if (routeSegments.length !== requestSegments.length) {
    return;
  }

  for (const [index, routeSegment] of routeSegments.entries()) {
    const requestSegment = requestSegments[index];

    if (!matchPart(routeSegment, requestSegment, params)) {
      return;
    }
  }

  return params;
};

export { matchPath };