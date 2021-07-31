export {};
// import create from "zustand";
// import { persist } from "zustand/middleware";

// interface CartStore {
//   components: any;
//   strategy: StrategyUpdate;

//   pushStep: (step: number) => void;
//   addOne: () => void;
//   prevStep: () => void;

//   setStrategy: (strat: StrategyUpdate) => void;

//   pushApplyImportJobsResponse: (data: ApplyImportJobsMutation) => void;
//   pushCreateImportJobsResponse: (data: CreateImportJobsMutation) => void;
//   pushLintImportJobsResponse: (data: LintImportJobsMutation) => void;

//   reset: () => void;
// }

// export const useCartStore = create<CartStore>(
//   persist(
//     (set, get) => ({
//       pushStep: step => set({ currentStep: step }),
//       nextStep: () => set({ currentStep: get().currentStep + 1 }),
//       prevStep: () => set({ currentStep: get().currentStep - 1 }),

//       pushApplyImportJobsResponse: (data: ApplyImportJobsMutation) =>
//         set({ applyImportResponseData: data }),
//       pushCreateImportJobsResponse: (data: CreateImportJobsMutation) =>
//         set({
//           applyImportResponseData: null,
//           createImportResponseData: data,
//           lintImportResponseData: null,
//         }),
//       pushLintImportJobsResponse: (data: LintImportJobsMutation) =>
//         set({ lintImportResponseData: data }),

//       setStrategy: (strat: StrategyUpdate) => set({ strategy: strat }),

//       reset: () =>
//         set({
//           strategy: StrategyUpdate.Override,
//           applyImportResponseData: null,
//           createImportResponseData: null,
//           lintImportResponseData: null,
//         }),
//     }),
//     { name: "import-jobs-store" }
//   )
// );
