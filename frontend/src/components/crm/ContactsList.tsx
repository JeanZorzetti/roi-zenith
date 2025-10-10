import React, { useState } from 'react';
import { Contact } from '../../types/CRM';
import { Trash2, Edit, Mail, Phone, Briefcase, Search } from 'lucide-react';

interface ContactsListProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: string) => void;
}

export const ContactsList: React.FC<ContactsListProps> = ({ contacts, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(contact =>
    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar contatos por nome ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Contacts List */}
      <div className="space-y-3">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? 'Nenhum contato encontrado' : 'Nenhum contato cadastrado ainda'}
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {contact.firstName} {contact.lastName}
                  </h3>

                  <div className="mt-2 space-y-1">
                    {contact.position && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="w-4 h-4 mr-2" />
                        {contact.position}
                        {contact.company?.name && ` @ ${contact.company.name}`}
                      </div>
                    )}

                    {contact.email && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        <a href={`mailto:${contact.email}`} className="hover:text-blue-600">
                          {contact.email}
                        </a>
                      </div>
                    )}

                    {contact.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        <a href={`tel:${contact.phone}`} className="hover:text-blue-600">
                          {contact.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {contact.notes && (
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                      {contact.notes}
                    </p>
                  )}
                </div>

                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => onEdit(contact)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editar contato"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Tem certeza que deseja excluir ${contact.firstName} ${contact.lastName}?`)) {
                        onDelete(contact.id);
                      }
                    }}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir contato"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
