export interface BaseFormControlType {
  inputLabel: string;
  formHelperText: string;
  name: string;
  required?: boolean;
  value?: string;
  disabled?: boolean;
  additionalHelperItem?: string;
  autoFocus?: boolean;
}
