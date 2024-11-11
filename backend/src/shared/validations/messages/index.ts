import max from './max';
import min from './min';
import oneOf from './oneOf';
import typeError from './typeError';

const validationsMessages = {
  dateValid: 'Campo deve ser uma data válida',
  email: 'Campo deve ser um e-mail válido',
  max,
  min,
  oneOf,
  onlyNumbers: 'Campo deve possuir apenas números',
  required: 'Campo obrigatório',
  typeError,
};

export default validationsMessages;
