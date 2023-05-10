import {SortType} from '@project/shared/app-types';

export const MAX_TAGS_NUMBER = 5;
export const DEFAULT_SORT_DIRECTION = 'desc';
export const DEFAULT_TASKS_LIMIT = 25;
export const DEFAULT_SORT_TYPE = SortType.CreatedAt;

export const FIELD = {
  MinTitle: 20,
  MaxTitle: 50,
  MinDescription: 100,
  MaxDescription: 1024,
  MinAddress: 10,
  MaxAddress: 255,
  MinTag: 3,
  MaxTag: 10
}

export const VALIDATION_ERROR = {
  TaskTitleLength: `Длина заголовка должна быть между ${FIELD.MinTitle} и ${FIELD.MaxTitle}.`,
  TaskDescriptionLength: `Количество символов в описании от ${FIELD.MinDescription} до ${FIELD.MaxDescription}.`,
  TaskAddressLength: `Количество символов в адресе от ${FIELD.MinAddress} до ${FIELD.MaxAddress}.`,
  TaskTagLength: `Количество символов тега от ${FIELD.MinTag} до ${FIELD.MinTag}.`,
  TaskTagsNumber: `Максимальное число тегов задачи ${MAX_TAGS_NUMBER} шт.`,
  TaskDuedateNotValid: 'Срок исполнения не может быть раньше текущей даты.'
}

export const EXCEPTION = {
  TaskForbidden: 'Доступ закрыт.',
  TaskStatusConditionsWrong: 'Ошибка в условиях обновления статуса.',
  TaskNotFound: 'Задание не найдено.',
  TaskCantTake: 'Ошибка в роли исполнителя.',
  TaskResponseExist: 'Уже есть задание в работе.',
  TaskContractorAlreadyChosen: 'Исполнитель уже назначен.',
  ContractorNotResponse: 'Ошибка выбора исполнителя.'
}
