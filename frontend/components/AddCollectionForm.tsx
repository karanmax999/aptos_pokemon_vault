import { FC, FormEvent } from "react";

interface AddCollectionFormProps {
  handleSubmit: (e: FormEvent) => void;
  collectionName: string;
  setCollectionName: (value: string) => void;
}

const AddCollectionForm: FC<AddCollectionFormProps> = ({ handleSubmit, collectionName, setCollectionName }) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="space-y-2 text-center">
        <h3 className="text-slate-300">No Agent Signal Detected</h3>
        <p className="text-xs text-slate-500">Initialize a new neural link to begin.</p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
          placeholder="Enter Agent Codename..."
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg shadow-cyan-900/20"
        >
          Initialize System
        </button>
      </div>
    </form>
  );
};

export default AddCollectionForm;
