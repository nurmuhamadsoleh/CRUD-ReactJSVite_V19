import { Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Field, Form } from "react-final-form";
import AppInput from "./ui/AppInput.jsx";
import {
  isSearchValueSafe,
  taskSearchSchema,
  validateWithSchema,
} from "../modules/tasks/Validation/TaskValidation.js";

export default function TaskSearchInput({ value, onChange, isSearching = false }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3">
      <Form
        initialValues={{ search: value }}
        onSubmit={() => undefined}
        validate={validateWithSchema(taskSearchSchema)}
        render={() => (
          <Field name="search">
            {({ input, meta }) => {
              const hasError = meta.touched && meta.error;

              return (
                <>
                  <AppInput
                    {...input}
                    onChange={(event) => {
                      const nextValue = event.target.value;
                      input.onChange(event);
                      onChange(isSearchValueSafe(nextValue) ? nextValue : "");
                    }}
                    allowClear
                    prefix={<SearchOutlined className="text-ink-500" />}
                    suffix={isSearching ? <Spin size="small" /> : null}
                    placeholder="Cari task dari API..."
                    aria-label="Cari task"
                    size="large"
                    status={hasError ? "error" : ""}
                    maxLength={225}
                  />
                  <p
                    className={`m-0 mt-2 text-xs ${hasError ? "text-red-500" : "text-ink-500"}`}
                  >
                    {hasError || "Pencarian berjalan otomatis setelah Anda berhenti mengetik."}
                  </p>
                </>
              );
            }}
          </Field>
        )}
      />
    </div>
  );
}
