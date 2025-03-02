import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: { fetchContributions: () => Promise<any> }
  }
}
