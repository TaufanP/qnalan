const makeCancelable = (promise: any) => {
  let hasCanceled_ = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    promise().then(
      (val: any) =>
        hasCanceled_ ? reject({ isCanceled: true }) : resolve(val),
      (error: any) =>
        hasCanceled_ ? reject({ isCanceled: true }) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

export { makeCancelable };

/*
  const fake2 = async () =>
    await new Promise((r) => setTimeout(() => r("aneh"), 4000));

  const makeC = makeCancelable(fake2);
  
  const test = () =>
    makeC.promise.then((r) => setDum(r)).catch((bro) => console.log(bro));

    
  const test = async () => {
    try {
      const isinya = await makeC.promise;
      setDum(isinya);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    return () => makeC.cancel();
  }, []);

*/
