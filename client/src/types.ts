export interface FieldError {
  property: string;
  constraints: {
    unique: string;
  };
}
