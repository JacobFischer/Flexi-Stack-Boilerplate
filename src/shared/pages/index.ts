import * as allPages from './pages';
import * as pageNotFoundExports from './404';

export const pageNotFound = pageNotFoundExports;

export type PageExport = {
  title: string;
  route: string;
  Component: React.FunctionComponent;
};

export const pagesList: PageExport[] = Object.values(allPages).sort((a, b) =>
  a.route.localeCompare(b.route),
);
