import {GET_MONTHLY_ATTENDANCE} from '../Constant';

export function getMonthlyAttn(configData) {
  return {
    type: GET_MONTHLY_ATTENDANCE,
    payload: configData,
  };
}
