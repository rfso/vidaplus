import React from 'react';

const AddForm = ({ 
  fields, 
  formData, 
  onChange, 
  onSubmit, 
  onCancel, 
  submitText = "Salvar",
  cancelText = "Cancelar"
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {fields.map((field) => (
            <div key={field.key} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                name={field.key}
                value={formData[field.key] || ''}
                onChange={onChange}
                placeholder={field.placeholder || field.label}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required={field.required !== false}
                type={field.type || 'text'}
              />
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {submitText}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 sm:flex-none bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {cancelText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm; 