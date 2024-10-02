export interface LoginMethod {
  id: string;
  icon: string;
  label: string;
  signIn(): Promise<void>;
}
