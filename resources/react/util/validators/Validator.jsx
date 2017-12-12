import {timeFn} from './validationRules/customRules/itemTimeRule';
import indicative from 'indicative';

let instance = null;

export default class Validator{

  constructor(){
    if(!instance){
      instance = indicative;
      instance.extend('itemTime', timeFn, 'Invalid item time');
    }
    return instance;
  }

};
