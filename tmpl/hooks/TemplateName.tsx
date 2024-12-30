import React, { useState, useEffect, useRef } from "react";

interface TemplateNameHookProps {}

const useTemplateName = (props: TemplateNameHookProps) => {
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

export default useTemplateName;
