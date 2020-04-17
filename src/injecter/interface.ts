export interface IInjecter {
  execute(): void
}

export interface IPopupService {
  info: (message: string) => void
  warn: (message: string) => void
  success: (message: string) => void
  confirm: (message: string) => void
}
