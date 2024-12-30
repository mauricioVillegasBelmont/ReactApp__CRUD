import  { useState, useEffect, useRef } from "react";

interface LoginHookProps {}

export const useLoginHooks = (props: LoginHookProps) => {
  const {} = props;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      return;
    }
  }, [ref.current]);

  return {
    ref,
    data,
    error,
  };
};
