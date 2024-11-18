import {GET_EMP_ATTENDANCE_DETAIL} from '../Constant';

export function fetchtEmpAttendanceDetail(configData) {
  return {
    type: GET_EMP_ATTENDANCE_DETAIL,
    payload: configData,
  };
}
