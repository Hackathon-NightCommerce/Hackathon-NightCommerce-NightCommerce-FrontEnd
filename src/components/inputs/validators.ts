import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export interface InputValidatorProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  placeholder?: string;
}

export interface SelectValidatorProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  value?: string[] | undefined;
  options: string[];
  error?: string;
}

export interface TextareaValidatorProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  error?: string;
}
