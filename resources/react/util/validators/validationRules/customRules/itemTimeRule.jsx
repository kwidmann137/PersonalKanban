export const timeFn = (data, field, message, args, get) => {

  return new Promise((resolve, reject) => {

    let validTimeRE = new RegExp('^[0-9]{1,2}:[0-9]{1,2}$');
    const match = validTimeRE.exec(data[field]);

    if (!match) {
      reject(message);
    }

    resolve();
  });
};
