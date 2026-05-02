import { Form as AntForm, Input } from "antd";
import { Field, Form } from "react-final-form";
import AppButton from "./ui/AppButton.jsx";
import {
  taskTitleSchema,
  validateWithSchema,
} from "../modules/tasks/Validation/TaskValidation.js";

export default function TaskComposer({ onAddTask, submitIcon }) {
  const handleSubmit = async (values, form) => {
    await onAddTask(values.title.trim());
    form.restart({ title: "" });
  };

  return (
    <Form
      initialValues={{ title: "" }}
      onSubmit={handleSubmit}
      validate={validateWithSchema(taskTitleSchema)}
      render={({ handleSubmit: submitForm, invalid, submitting, values }) => (
        <form onSubmit={submitForm} className="m-0">
          <Field name="title">
            {({ input, meta }) => {
              const hasError = meta.touched && meta.error;

              return (
                <AntForm.Item
                  label={<span className="font-semibold text-ink-900">Task baru</span>}
                  className="mb-3"
                  validateStatus={hasError ? "error" : ""}
                  help={hasError || "Maksimal 225."}
                >
                  <Input.TextArea
                    {...input}
                    placeholder="Contoh: Review desain dashboard"
                    autoSize={{ minRows: 4, maxRows: 6 }}
                    maxLength={225}
                    showCount
                  />
                </AntForm.Item>
              );
            }}
          </Field>

          <div className="mt-4">
            <AppButton
              type="primary"
              htmlType="submit"
              icon={submitIcon}
              block
              loading={submitting}
              disabled={invalid || submitting || !values.title?.trim()}
            >
              Tambah Task
            </AppButton>
          </div>
        </form>
      )}
    />
  );
}
