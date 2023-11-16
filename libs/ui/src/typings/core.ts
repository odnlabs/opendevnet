export enum ToastType {
  Info = 'info',
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
}

export interface IToast {
  title: string;
  type: `${ToastType}`;
  id?: string | undefined;
  description?: string | undefined;
  time?: number | undefined;
}
