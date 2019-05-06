import PropTypes from 'prop-types';

export const defaultLabels = {
  step1Label: 'Consultor e duração',
  step2Label: 'Data e horário',
  minuteslabel: 'minutos',
  buttonLabelCancel: 'Cancelar',
  buttonLabelNext: 'Avançar',
  buttonLabelprevious: 'Voltar',
  buttonLabelSchedule: 'Agendar',
  noTimeSlotAvailable: 'Nenhum horário disponivel',
};

const Company = {};

Company.propTypes = {
  label: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  data: PropTypes.object,
};

export const Person = {};

Person.propTypes = {
  code: PropTypes.string.isRequired,
  companyCode: PropTypes.string,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export const TimeslotData = {};

TimeslotData.propTypes = {
  companies: PropTypes.arrayOf(Company),
  persons: PropTypes.arrayOf(Person),
  slotDurations: PropTypes.arrayOf(PropTypes.number),
  selectedPeople: PropTypes.arrayOf(Person),
  selectedDate: PropTypes.object,
  selectedTime: PropTypes.object,
  selectedSlotDuration: PropTypes.number,
  otherData: PropTypes.object,
};
