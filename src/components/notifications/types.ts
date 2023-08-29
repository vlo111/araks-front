export enum NotificationsStatusFilter {
  All = 'all',
  Unread = 'unread',
}

export type NotificationsPage = {
  page: number;
  size: number;
  status: NotificationsStatusFilter;
};
