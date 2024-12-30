import React, { useState, useEffect } from "react";

interface TemplateNameHookProps {}

const useTemplateName = (props: TemplateNameHookProps) => {
  const {} = props;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

  },[])

  return {
    data,
    error,
  };
};

export default useTemplateName;
