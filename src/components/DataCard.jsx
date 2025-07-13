import React from 'react';

const DataCard = ({ 
  data, 
  fields, 
  onEdit, 
  onDelete, 
  onSave, 
  onCancel, 
  isEditing, 
  editData, 
  onEditChange,
  actions = true 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 hover:shadow-md transition-shadow max-w-sm w-full overflow-hidden mx-auto">
      <div className="space-y-3">
        {/* Data Fields */}
        {fields.map((field) => (
          <div key={field.key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center mb-2 sm:mb-0">
              <span className="text-sm font-medium text-gray-500 min-w-[80px] sm:min-w-[100px]">
                {field.label}:
              </span>
            </div>
            <div className="flex-1 sm:ml-1">
              {isEditing ? (
                <input
                  name={field.key}
                  value={editData[field.key] || ''}
                  onChange={onEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder={field.placeholder || field.label}
                />
              ) : (
                <span className="text-sm text-gray-900 break-words break-all whitespace-pre-line">
                  {data[field.key] || '-'}
                </span>
              )}
            </div>
          </div>
        ))}
        
        {/* Actions */}
        {actions && (
          <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-gray-100">
            {isEditing ? (
              <>
                <button
                  onClick={onSave}
                  className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Salvar
                </button>
                <button
                  onClick={onCancel}
                  className="flex-1 sm:flex-none bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onEdit(data)}
                  className="flex-1 sm:flex-none bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(data.id)}
                  className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Excluir
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataCard; 