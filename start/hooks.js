const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Validator = use('Validator');

  const timeFn = async (data, field, message, args, get) => {

    let validTimeRE = new RegExp('^[0-9]{1,2}:[0-9]{1,2}$');
    const match = validTimeRE.exec(data[field]);

    if (!match) {
      throw message
    }
  };

  Validator.extend('itemTime', timeFn);

  const maxHoursFn = async (data, field, message, args, get) => {

    let allItems = data[field];

    let dailyTotals = new Array(7);
    dailyTotals.fill(0);

    const days = [
      'Mon',
      'Tues',
      'Wed',
      'Thurs',
      'Fri',
      'Sat',
      'Sun'
    ];

    allItems.forEach( item => {
      item.hours.forEach((hour, index) => dailyTotals[index] += hour);
    });

    const longDays = [];

    if(dailyTotals.some(total => total > args[0])){
      dailyTotals.forEach((total, index) => {
        if(total > args[0]){
          longDays.push(days[index]);
        }
      });
    }



    if(longDays.length > 0){
      throw "The following days total more than 18 hours of work: (" + longDays.join() + ").\nMake sure you're totals are not higher than 18 hours per day so you can sleep!";
    }
  };

  Validator.extend('maxHours', maxHoursFn);

});
