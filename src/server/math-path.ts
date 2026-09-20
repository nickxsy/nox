import path from 'node:path';

const FIRST_CHARACTER_INDEX = 1;

const matchPart = (
  routeSegment: string | undefined,
  requestSegment: string | undefined,
  params: Record<string, string>,
): boolean => {
  if (!routeSegment || !requestSegment) {
    return true;
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
    requestSegments = requestPath.split(path.sep),
    routeSegments = routePath.split(path.sep);

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