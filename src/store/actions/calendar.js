import {GET_MONTHLY_ATTENDANCE} from '../Constant';

export function getMonthlyAttn(configData) {
  console.log('in action getMonthlyAttn');
  return {
    type: GET_MONTHLY_ATTENDANCE,
    payload: configData,
  };
}
