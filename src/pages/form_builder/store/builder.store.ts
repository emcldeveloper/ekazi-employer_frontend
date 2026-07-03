import { create } from "zustand";

import type {
  BuilderState,
  BuilderStore,
  QuestionType,
} from "../types/builder.types";

import { createQuestion } from "../utils/questionFactory";

const initialState: BuilderState = {
  title: "",

  description: "",

  selectedQuestionId: null,

  questionOrder: [],

  questions: {},
};

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  ...initialState,

  patchForm: (patch) =>
    set((state) => ({
      ...state,
      ...patch,
    })),

  addQuestion: (type: QuestionType = "TEXT") => {
    const question = createQuestion(type);

    set((state) => ({
      questions: {
        ...state.questions,
        [question.id]: question,
      },

      questionOrder: [...state.questionOrder, question.id],

      selectedQuestionId: question.id,
    }));
  },

  patchQuestion: (id, patch) =>
    set((state) => {
      const question = state.questions[id];

      if (!question) return state;

      const next = {
        ...question,
        ...patch,
      };

      if (patch.type && patch.type !== question.type) {
        const needsOptions =
          patch.type === "SELECT" ||
          patch.type === "CHECKBOX" ||
          patch.type === "RADIO";

        next.options = needsOptions
          ? [
              {
                id: crypto.randomUUID(),
                value: "Option 1",
              },
            ]
          : [];
      }

      return {
        questions: {
          ...state.questions,
          [id]: next,
        },
      };
    }),

  deleteQuestion: (id) =>
    set((state) => {
      const questions = {
        ...state.questions,
      };

      delete questions[id];

      const questionOrder = state.questionOrder.filter((q) => q !== id);

      return {
        questions,

        questionOrder,

        selectedQuestionId: questionOrder[0] ?? null,
      };
    }),

  duplicateQuestion: (id) => {
    const original = get().questions[id];

    if (!original) return;

    const copy = {
      ...original,
      id: crypto.randomUUID(),

      options: original.options.map((o) => ({
        ...o,
        id: crypto.randomUUID(),
      })),
    };

    set((state) => {
      const index = state.questionOrder.indexOf(id);

      const order = [...state.questionOrder];

      order.splice(index + 1, 0, copy.id);

      return {
        questions: {
          ...state.questions,
          [copy.id]: copy,
        },

        questionOrder: order,

        selectedQuestionId: copy.id,
      };
    });
  },

  moveQuestion: (activeId, overId) =>
    set((state) => {
      const order = [...state.questionOrder];

      const oldIndex = order.indexOf(activeId);

      const newIndex = order.indexOf(overId);

      order.splice(oldIndex, 1);

      order.splice(newIndex, 0, activeId);

      return {
        questionOrder: order,
      };
    }),

  selectQuestion: (selectedQuestionId) =>
    set({
      selectedQuestionId,
    }),

  addOption: (questionId) =>
    set((state) => {
      const question = state.questions[questionId];

      return {
        questions: {
          ...state.questions,

          [questionId]: {
            ...question,

            options: [
              ...question.options,

              {
                id: crypto.randomUUID(),
                value: "",
              },
            ],
          },
        },
      };
    }),

  patchOption: (questionId, optionId, patch) =>
    set((state) => ({
      questions: {
        ...state.questions,

        [questionId]: {
          ...state.questions[questionId],

          options: state.questions[questionId].options.map((option) =>
            option.id === optionId
              ? {
                  ...option,
                  ...patch,
                }
              : option,
          ),
        },
      },
    })),

  removeOption: (questionId, optionId) =>
    set((state) => ({
      questions: {
        ...state.questions,

        [questionId]: {
          ...state.questions[questionId],

          options: state.questions[questionId].options.filter(
            (option) => option.id !== optionId,
          ),
        },
      },
    })),

  reset: () => set(initialState),

  load: (form) => set(form),
}));
