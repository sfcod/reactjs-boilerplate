import { useEffect, useRef } from 'react';

const isProd = process.env.NODE_ENV === 'production';

export const useEffectOnce = isProd
    ? useEffect
    : (callback: () => (() => any) | void, deps: Array<any>) => {
          const executedRef = useRef<boolean>(false);
          const descrutorRef = useRef<any>();
          const depsRef = useRef<Array<any>>(deps);

          useEffect(() => {
              for (let i = 0; i < depsRef.current.length; i++) {
                  if (depsRef.current[i] !== deps[i]) {
                      if (descrutorRef.current) {
                          descrutorRef.current();
                      }
                      executedRef.current = false;
                      depsRef.current = deps;
                      break;
                  }
              }

              if (executedRef.current) {
                  if (depsRef.current.length === 0 && descrutorRef.current) {
                      return descrutorRef.current;
                  }
                  return;
              }

              executedRef.current = true;
              descrutorRef.current = callback();
          }, deps);
      };
