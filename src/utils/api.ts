/* eslint-disable promise/always-return */
import { useEffect } from 'react';
import Deferred from './deferred';

/**
 * 
 * @param getData 
 * @param options 
  @return {void}
 */
export function useAsyncDataEffect(
  getData: () => Promise<any>,
  options: {
    stateName: string;
    otherStatesToMonitor?: unknown[];
    setter: (arg: any) => void;
  },
) {
  let cancelled = false;
  const { setter, stateName } = options;
  useEffect(() => {
    const d = new Deferred();

    getData()
      .then((jsonData) => {
        if (cancelled) return;
        else d.resolve(jsonData);
      })
      .catch(err => d.reject(err));

    d.promise
      .then((data: any) => {
        if (!cancelled) {
          console.info(
            '%c Updating state: ' + stateName,
            'background: green; color: white; display: block;',
          );
          setter(data);
        }
      })
      .catch(console.error);
    return () => {
      cancelled = true;
    };
  }, [...(options.otherStatesToMonitor || []), stateName]);
}
