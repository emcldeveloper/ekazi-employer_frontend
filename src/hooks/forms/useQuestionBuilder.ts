import { useState } from "react";
import { useFieldArray, type Control } from "react-hook-form";

import type { CreateFormDto } from "@/@types/forms";

const emptyQuestion = {
  title: "",
  description: "",
  type: "TEXT",
  required: false,
  order: 0,
  options: [],
};

export function useQuestionBuilder(control: Control<CreateFormDto>) {
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const fieldArray = useFieldArray({
    control,
    name: "questions",
  });

  const addQuestion = (type = "TEXT") => {
    fieldArray.append({
      ...emptyQuestion,
      type,
      order: fieldArray.fields.length,
    });

    setSelectedQuestion(fieldArray.fields.length);
  };

  const removeQuestion = (index: number) => {
    fieldArray.remove(index);

    if (selectedQuestion >= index) {
      setSelectedQuestion(Math.max(0, index - 1));
    }
  };

  const duplicateQuestion = (index: number) => {
    fieldArray.insert(index + 1, {
      ...fieldArray.fields[index],
      order: index + 1,
    });

    setSelectedQuestion(index + 1);
  };

  return {
    ...fieldArray,

    selectedQuestion,

    setSelectedQuestion,

    addQuestion,

    removeQuestion,

    duplicateQuestion,
  };
}
