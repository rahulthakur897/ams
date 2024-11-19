import {DOWNLOAD_REPORT} from '../Constant';

export function downloadEmpReport(configData) {
  return {
    type: DOWNLOAD_REPORT,
    payload: configData,
  };
}
