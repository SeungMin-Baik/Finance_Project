import { CONFIG_SUCCESS_DATA, CONFIG_FAIL_DATA, CONFIG_COUNT_DATA } from './constants';
import { SuccessDataType, FailDataType, CountDataType } from './models';
import { action } from 'typesafe-actions';

 export const configSuccess = (success: SuccessDataType) => action(
    CONFIG_SUCCESS_DATA,
    success
);

export const configFail = (fail: FailDataType) => action(
    CONFIG_FAIL_DATA,
    fail
);

export const configCountCall = (count: FailDataType) => action(
    CONFIG_COUNT_DATA,
    count
);