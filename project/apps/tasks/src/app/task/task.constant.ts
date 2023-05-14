import {SortType} from '@project/shared/app-types';

export const enum SortDirection {
  desc = 'desc',
  asc = 'asc'
}

export const TASK_DEFAULT = {
  TASKS_LIMIT: 25,
  MAX_TAGS_NUMBER: 5,
  SORT_DIRECTION: SortDirection.desc,
  SORT_TYPE:SortType.CreatedAt
};
// export const MAX_TAGS_NUMBER = 5;
// export const DEFAULT_SORT_DIRECTION = 'desc';
// export const DEFAULT_TASKS_LIMIT = 25;
// export const DEFAULT_SORT_TYPE = SortType.CreatedAt;

export const TASK_FIELD = {
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
  TaskTitleLength: `Длина заголовка должна быть между ${TASK_FIELD.MinTitle} и ${TASK_FIELD.MaxTitle}.`,
  TaskDescriptionLength: `Количество символов в описании от ${TASK_FIELD.MinDescription} до ${TASK_FIELD.MaxDescription}.`,
  TaskAddressLength: `Количество символов в адресе от ${TASK_FIELD.MinAddress} до ${TASK_FIELD.MaxAddress}.`,
  TaskTagLength: `Количество символов тега от ${TASK_FIELD.MinTag} до ${TASK_FIELD.MinTag}.`,
  TaskTagsNumber: `Максимальное число тегов задачи ${TASK_DEFAULT.MAX_TAGS_NUMBER} шт.`,
  TaskDueDateNotValid: 'Срок исполнения не может быть раньше текущей даты.'
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
