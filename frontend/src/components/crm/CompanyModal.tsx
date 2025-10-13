import React, { useState, useEffect } from 'react';
import { Company } from '../../types/CRM';
import { X } from 'lucide-react';

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (company: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  company?: Company | null;
}

export const CompanyModal: React.FC<CompanyModalProps> = ({
  isOpen,
  onClose,
  onSave,
  company,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    size: '',
    website: '',
    phone: '',
    address: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load company data when editing
  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || '',
        sector: company.sector || '',
        size: company.size || '',
        website: company.website || '',
        phone: company.phone || '',
        address: company.address || '',
        notes: company.notes || '',
      });
    } else {
      setFormData({
        name: '',
        sector: '',
        size: '',
        website: '',
        phone: '',
        address: '',
        notes: '',
      });
    }
    setErrors({});
  }, [company, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome da empresa é obrigatório';
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'URL inválida (deve começar com http:// ou https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await onSave({
        name: formData.name.trim(),
        sector: formData.sector.trim() || undefined,
        size: formData.size.trim() || undefined,
        website: formData.website.trim() || undefined,
        phone: formData.phone.trim() || undefined,
        address: formData.address.trim() || undefined,
        notes: formData.notes.trim() || undefined,
      } as Omit<Company, 'id' | 'createdAt' | 'updatedAt'>);

      onClose();
    } catch (error) {
      console.error('Error saving company:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
      onClick={(e) => {
        // Close only if clicking the backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {company ? 'Editar Empresa' : 'Nova Empresa'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome da Empresa <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 bg-white ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Acme Corporation"
              autoFocus
              disabled={loading}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Sector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Setor
            </label>
            <input
              type="text"
              value={formData.sector}
              onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 bg-white"
              placeholder="Tecnologia, Saúde, Educação..."
              disabled={loading}
            />
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tamanho
            </label>
            <select
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 bg-white"
              disabled={loading}
            >
              <option value="">Selecione...</option>
              <option value="1-10">1-10 funcionários</option>
              <option value="11-50">11-50 funcionários</option>
              <option value="51-200">51-200 funcionários</option>
              <option value="201-500">201-500 funcionários</option>
              <option value="501-1000">501-1000 funcionários</option>
              <option value="1000+">1000+ funcionários</option>
            </select>
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 bg-white ${
                errors.website ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://www.exemplo.com"
              disabled={loading}
            />
            {errors.website && (
              <p className="mt-1 text-sm text-red-600">{errors.website}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 bg-white"
              placeholder="(11) 3333-4444"
              disabled={loading}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Endereço
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 bg-white"
              placeholder="Rua Exemplo, 123 - São Paulo, SP"
              disabled={loading}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notas
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-gray-900 bg-white"
              placeholder="Informações adicionais sobre a empresa..."
              disabled={loading}
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Salvando...' : company ? 'Atualizar' : 'Criar Empresa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
