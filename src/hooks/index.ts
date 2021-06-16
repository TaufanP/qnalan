import { useEffect } from "react";

const useAsync = (asyncFn: any, caller: any, failer: any) => {
  useEffect(() => {
    let isActive = true;
    const asfn = async () => {
      try {
        const data = await asyncFn();
        console.log({ data });
        if (isActive) caller(data);
      } catch (error) {
        if (isActive) failer(error);
      }
    };
    asfn();
    return () => {
      isActive = false;
    };
  }, [asyncFn, caller]);
};

export { useAsync };
