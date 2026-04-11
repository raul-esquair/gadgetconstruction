"use client";

import { cn } from "@/lib/utils";

interface FormFieldBaseProps {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  className?: string;
}

interface InputFieldProps extends FormFieldBaseProps {
  type: "text" | "email" | "tel";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TextareaFieldProps extends FormFieldBaseProps {
  type: "textarea";
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

interface SelectFieldProps extends FormFieldBaseProps {
  type: "select";
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

const fieldStyles =
  "w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-base text-primary placeholder:text-neutral-300 transition-colors focus:border-accent-orange focus:ring-1 focus:ring-accent-orange focus:outline-none";

const errorFieldStyles = "border-accent-red focus:border-accent-red focus:ring-accent-red";

export default function FormField(props: FormFieldProps) {
  const { label, name, required, error, className } = props;

  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={name} className="block text-sm font-medium text-primary font-heading">
        {label}
        {required && <span className="text-accent-red ml-0.5">*</span>}
      </label>

      {props.type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          required={required}
          placeholder={props.placeholder}
          rows={props.rows || 4}
          value={props.value}
          onChange={props.onChange}
          className={cn(fieldStyles, error && errorFieldStyles, "resize-y")}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      ) : props.type === "select" ? (
        <select
          id={name}
          name={name}
          required={required}
          value={props.value}
          onChange={props.onChange}
          className={cn(fieldStyles, error && errorFieldStyles, "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10")}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          <option value="">Select a service...</option>
          {props.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={props.type}
          required={required}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          className={cn(fieldStyles, error && errorFieldStyles)}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}

      {error && (
        <p id={`${name}-error`} className="text-sm text-accent-red" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
