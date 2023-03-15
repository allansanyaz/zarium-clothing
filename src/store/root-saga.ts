import { all, call } from 'typed-redux-saga';

import { categoriesSaga } from './categories/category.saga';
import { userSagas } from "./user/user.saga";

// asterisk for generator function
export function* rootSaga() {
	yield all([call(categoriesSaga), call(userSagas)]);
}