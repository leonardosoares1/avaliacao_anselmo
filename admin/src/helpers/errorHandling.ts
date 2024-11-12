import EHttpStatusCodes from '@enums/httpStatusCodes';
import { AxiosError, isAxiosError } from 'axios';

import ToastManager from '@components/utils/Toast/ToastManager';

import IHttpClientError from '@services/httpClient/responses/default/IHttpClientError';

function _httpClientError(err: AxiosError<IHttpClientError>): void {
  const statusHttpCode = err.response?.status;
  if (statusHttpCode === EHttpStatusCodes.BAD_REQUEST) {
    const message = err.response?.data.error.message;
    ToastManager.show({
      title: message || 'Falha para realizar ação',
      type: 'error',
      duration: 4500,
    });
    return;
  }
  if (statusHttpCode === EHttpStatusCodes.CONFLICT) {
    const message = err.response?.data.error.message;
    ToastManager.show({
      title: message || 'Falha na requisição',
      type: 'error',
    });
    return;
  }
  if (statusHttpCode === EHttpStatusCodes.PAYLOAD_TOO_LARGE) {
    ToastManager.show({
      title: 'Tamanho limite de imagem é de 5mb',
      type: 'error',
    });
    return;
  }
  if (statusHttpCode === EHttpStatusCodes.INTERNAL_SERVER_ERROR) {
    ToastManager.show({
      title: 'Servidor indisponível no momento',
      type: 'error',
    });
  }
}

function errorHandling(err: unknown): void {
  if (isAxiosError(err)) {
    _httpClientError(err);
    return;
  }
  if (err instanceof Error) {
    ToastManager.show({
      title: err.message,
      type: 'error',
    });
    return;
  }
  ToastManager.show({
    title: String(err),
    type: 'error',
  });
}

export default errorHandling;
