import clsx from "clsx";
import { useController } from "react-hook-form";

export type TField = {
  label: string;
  type?: string;
  control?: any;
  name: string;
  placeholder?: string;
  onChange?: (payload: any) => void;
  onClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onBackClick?: () => void;
  items?: string[];
  readOnly?: boolean;
}

export function TextField({
  label,
  type = 'text',
  control,
  name,
  placeholder,
  ...rest
}: Omit<TField, 'items'>) {

  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    control,
    name
  })

  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        className={clsx('bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5', {
          'border-red-500': Boolean(error?.message)
        })}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required
        {...rest}
      />
      {error && Boolean(error.message) && (
        <p className="text-red-500">{error?.message}</p>
      )}
    </div>
  );
}

export function ViewButtons({ onBackClick, onEditClick, onDeleteClick }: Pick<TField, 'onEditClick' | 'onDeleteClick' | 'onBackClick'>) {
  return (
    <div className="flex justify-between mb-5">
      <button type="button" onClick={onBackClick} className="text-gray-700 border border-gray-700 hover:border-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
        Back
      </button>
      <div className="flex gap-2">
        <button type="button" onClick={onEditClick} className="text-blue-700 border border-blue-700 hover:border-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          Edit
        </button>
        <button type="button" onClick={onDeleteClick} className="text-red-500 border border-red-500 hover:border-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          Delete
        </button>
      </div>
    </div>
  );
}

export function SubmitButton({ label, onClick }: Pick<TField, 'label' | 'onClick'>) {
  return (
    <div className="flex">
      <button type="button" onClick={onClick} className="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
        {label}
      </button>
    </div>
  );
}

export function CancelButton({ onClick }: Pick<TField, 'onClick'>) {
  return (
    <div className="flex">
      <button type="button" onClick={onClick} className="flex-1 text-gray-500 border border-gray-500 hover:border-gray-400 focus:ring-4 focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
        Cancel
      </button>
    </div>
  );
}