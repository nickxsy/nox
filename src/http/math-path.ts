import { sep } from "node:path";

export function matchPath(
  path: string,
  path2: string,
): Record<string, string> | undefined {
  const SEPARATOR = sep;

  const v1 = path.split(SEPARATOR);
  const v2 = path2.split(SEPARATOR);

  const params: Record<string, string> = {};

  if (v1.length !== v2.length) {
    return;
  }

  for (let i = 0; i < v1.length; i++) {
    const routeSegment = v1[i];
    const urlSegment = v2[i];

    if (!routeSegment || !urlSegment) {
      continue;
    }

    const isParam = routeSegment.startsWith(":");

    if (isParam) {
      const paramName = routeSegment.slice(1);

      params[paramName] = urlSegment;

      continue;
    }

    if (routeSegment !== urlSegment) {
      return;
    }
  }

  return params;
}
