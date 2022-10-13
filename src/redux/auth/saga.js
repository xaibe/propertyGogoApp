import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { auth } from 'helpers/Firebase';
import { adminRoot, currentUser } from 'constants/defaultValues';
import { getCurrentUser, setCurrentUser } from 'helpers/Utils';
import { loginApi, registerApi, setPassword } from 'api';
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  SET_PASSWORD,
} from '../actions';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
  setPasswordError,
  setPasswordSuccess
} from './actions';
// import { useParams } from 'react-router-dom';

export function* watchLoginUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

// eslint-disable-next-line no-return-await
//   await auth
//     .signInWithEmailAndPassword(email, password)
//     .then((user) => user)
//     .catch((error) => error);

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const res = yield call(loginApi, email, password);
    console.log("response",res);
    if (res?.data?.access_token) {
      
      setCurrentUser(res.data.access_token);
      const user = getCurrentUser(res.data.access_token);
      yield put(loginUserSuccess(user));
      history.push('/');
    } else {
      yield put(loginUserError("email or password is invalid"));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchRegisterUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

function* registerWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;

  try {
    const res = yield call(registerApi, email, password);
    if (!res.message) {
      const item = { uid: res.user.uid, ...currentUser };
      setCurrentUser(item);
      yield put(registerUserSuccess(item));
      history.push('/');
    } else {
      yield put(registerUserError(res.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchSetPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(SET_PASSWORD, setPasswordWithEmail);
}


function* setPasswordWithEmail({ payload }) {
  const { newPassword } = payload.user;
  const { history } = payload;
  
  try {
    const res = yield call(setPassword, newPassword);
    if (!res.message) {
      const item = { uid: res.user.uid, ...currentUser };
      setCurrentUser(item);
      yield put(setPasswordSuccess(item));
      history.push('/auth/login');
    } else {
      yield put(setPasswordError(res.message));
    }
  } catch (error) {
    yield put(setPasswordError(error));
  }
}

export function* watchLogoutUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  await auth
    .signOut()
    .then((user) => user)
    .catch((error) => error);
  history.push(adminRoot);
};

function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser();
  yield call(logoutAsync, history);
}

export function* watchForgotPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .sendPasswordResetEmail(email)
    .then((user) => user)
    .catch((error) => error);
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess('success'));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess('success'));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
  ]);
}
