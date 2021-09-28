import { combineReducers } from 'redux';

import { SuccessDataType, FailDataType, CountDataType } from './models';
import { ActionType } from 'typesafe-actions';
import * as LogtDataAction from './actions';
import { initSuccessData, initFailData, initCountData } from './defaults';
import { CONFIG_SUCCESS_DATA, CONFIG_FAIL_DATA, CONFIG_COUNT_DATA } from './constants';

export type ConfigAction = ActionType<typeof LogtDataAction>;
export type ConfigState = {
    readonly success: SuccessDataType;
    readonly fail: FailDataType;
    readonly count: CountDataType;
};

export default combineReducers<ConfigState, ConfigAction>({
    success: (state = initSuccessData, action) => {
        switch (action.type) {
            case CONFIG_SUCCESS_DATA:
                return {
                    ...state,
                    success: action.payload
                };
            default:
                return state;
        }
    },

    fail: (state = initFailData, action) => {
        switch (action.type) {
            case CONFIG_FAIL_DATA:
                return {
                    ...state,
                    fail: action.payload
                };
            default:
                return state;
        }
    },

    count: (state = initCountData, action) => {
        switch (action.type) {
            case CONFIG_COUNT_DATA:
                return {
                    ...state,
                    count: action.payload
                };
            default:
                return state;
        }
    }
});