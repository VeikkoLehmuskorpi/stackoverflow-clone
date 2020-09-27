export interface FieldError {
  property: string;
  constraints: {
    unique: string;
  };
}

export interface FormError {
  name: string;
  errors: Array<string>;
}
