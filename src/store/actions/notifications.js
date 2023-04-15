export const SAVE_NOTIFICATION = 'SAVE_NOTIFICATION';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';

export const saveNotification = notification => ({ type: SAVE_NOTIFICATION, notification });

export const deleteNotification = () => ({ type: DELETE_NOTIFICATION });
