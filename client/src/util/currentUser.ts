import { MeQuery, useMeQuery } from '../generated/graphql';

export const getCurrentUser = (): { data: MeQuery | undefined; loading: boolean } => {
  const { data, loading } = useMeQuery();
  return { data, loading };
};
