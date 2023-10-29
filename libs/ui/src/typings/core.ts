export enum ToastType {
  Info = 'info',
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
}

export interface IToast {
  id?: string;
  title: string;
  description?: string;
  type: `${ToastType}`;
  time?: number;
}
