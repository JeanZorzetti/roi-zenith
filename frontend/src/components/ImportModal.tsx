import { useState } from 'react';
import { X, Upload, FileJson, CheckCircle, AlertCircle, Download } from 'lucide-react';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: any) => void;
  currentBoardId: string;
}

const EXAMPLE_JSON = {
  board: {
    title: "Exemplo de Projeto",
    description: "Descrição opcional do board"
  },
  columns: [
    {
      id: "todo",
      title: "A Fazer",
      color: "bg-blue-500",
      subColumns: [
        {
          title: "Sprint 1",
          tasks: [
            {
              title: "Implementar autenticação",
              description: "Sistema completo de login e registro",
              priority: "high",
              dueDate: "2024-12-31",
              assignee: "João Silva",
              tags: ["backend", "security"],
              checklist: [
                "Setup JWT",
                "Criar endpoints",
                "Testar segurança"
              ]
            },
            {
              title: "Criar dashboard",
              description: "Interface administrativa",
              priority: "medium",
              tags: ["frontend", "ui"]
            }
          ]
        },
        {
          title: "Sprint 2",
          tasks: [
            {
              title: "Deploy produção",
              description: "Configurar CI/CD",
              priority: "high",
              assignee: "Maria Santos",
              tags: ["devops"]
            }
          ]
        }
      ]
    },
    {
      id: "doing",
      title: "Em Progresso",
      color: "bg-yellow-500"
    },
    {
      id: "done",
      title: "Concluído",
      color: "bg-green-500"
    }
  ]
};

export const ImportModal = ({ isOpen, onClose, onImport, currentBoardId }: ImportModalProps) => {
  const [jsonText, setJsonText] = useState('');
  const [preview, setPreview] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleParse = () => {
    setError(null);
    setPreview(null);

    try {
      const parsed = JSON.parse(jsonText);

      // Suporta dois formatos: antigo (tasks direto) e novo (columns com subColumns)
      let taskCount = 0;
      let subColumnCount = 0;

      // Formato novo: columns com subColumns
      if (parsed.columns && Array.isArray(parsed.columns)) {
        parsed.columns.forEach((column: any, colIdx: number) => {
          if (column.subColumns && Array.isArray(column.subColumns)) {
            column.subColumns.forEach((subCol: any, subIdx: number) => {
              subColumnCount++;
              if (!subCol.title) {
                throw new Error(`Coluna ${colIdx + 1}, SubColuna ${subIdx + 1}: campo "title" é obrigatório`);
              }
              if (subCol.tasks && Array.isArray(subCol.tasks)) {
                subCol.tasks.forEach((task: any, taskIdx: number) => {
                  taskCount++;
                  if (!task.title) {
                    throw new Error(`SubColuna "${subCol.title}", Task ${taskIdx + 1}: campo "title" é obrigatório`);
                  }
                });
              }
            });
          }
        });
      }

      // Formato antigo: tasks direto (retrocompatibilidade)
      if (parsed.tasks && Array.isArray(parsed.tasks)) {
        parsed.tasks.forEach((task: any, index: number) => {
          taskCount++;
          if (!task.title) {
            throw new Error(`Task ${index + 1}: campo "title" é obrigatório`);
          }
          if (!task.column) {
            throw new Error(`Task ${index + 1}: campo "column" é obrigatório`);
          }
        });
      }

      if (taskCount === 0 && subColumnCount === 0) {
        throw new Error('JSON deve conter tarefas em "tasks" ou em "columns[].subColumns[].tasks"');
      }

      setPreview(parsed);
    } catch (err: any) {
      setError(err.message || 'JSON inválido');
    }
  };

  const handleImport = () => {
    if (!preview) return;

    try {
      onImport(preview);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setJsonText('');
        setPreview(null);
        setSuccess(false);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Erro ao importar');
    }
  };

  const downloadExample = () => {
    const blob = new Blob([JSON.stringify(EXAMPLE_JSON, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exemplo-importacao.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadExample = () => {
    setJsonText(JSON.stringify(EXAMPLE_JSON, null, 2));
    setError(null);
    setPreview(null);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <FileJson className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Importar Tarefas (JSON)</h2>
              <p className="text-sm text-gray-400">Cole ou edite o JSON abaixo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Actions */}
          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={loadExample}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
            >
              <Upload className="h-4 w-4" />
              <span>Carregar Exemplo</span>
            </button>
            <button
              onClick={downloadExample}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
            >
              <Download className="h-4 w-4" />
              <span>Baixar Template</span>
            </button>
          </div>

          {/* JSON Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Cole o JSON aqui:
            </label>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder="{ ... }"
              className="w-full h-64 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Parse Button */}
          <button
            onClick={handleParse}
            disabled={!jsonText.trim()}
            className="w-full mb-4 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
          >
            Validar JSON
          </button>

          {/* Error */}
          {error && (
            <div className="mb-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-300">Erro na validação</p>
                <p className="text-sm text-red-400 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-4 p-4 bg-green-900/30 border border-green-500/50 rounded-lg flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <p className="text-sm font-medium text-green-300">Importado com sucesso!</p>
            </div>
          )}

          {/* Preview */}
          {preview && !error && (
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Preview</h3>

              {/* Board Info */}
              {preview.board && (
                <div className="mb-4 p-3 bg-gray-900/50 rounded-lg">
                  <p className="text-sm text-gray-400">Board</p>
                  <p className="text-white font-medium">{preview.board.title || 'Sem título'}</p>
                  {preview.board.description && (
                    <p className="text-sm text-gray-400 mt-1">{preview.board.description}</p>
                  )}
                </div>
              )}

              {/* Columns with SubColumns */}
              {preview.columns && preview.columns.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">
                    {preview.columns.length} coluna(s) a processar:
                  </p>
                  <div className="space-y-3">
                    {preview.columns.map((col: any, idx: number) => (
                      <div key={idx} className="border border-gray-700 rounded-lg p-3">
                        <div className={`inline-flex items-center px-3 py-1 ${col.color || 'bg-gray-500'} bg-opacity-20 border border-gray-600 rounded-lg text-sm text-white mb-2`}>
                          {col.title}
                        </div>
                        {col.subColumns && col.subColumns.length > 0 && (
                          <div className="ml-4 mt-2 space-y-2">
                            <p className="text-xs text-gray-500">
                              {col.subColumns.length} subcoluna(s):
                            </p>
                            {col.subColumns.map((subCol: any, subIdx: number) => (
                              <div key={subIdx} className="pl-3 border-l-2 border-purple-500/50">
                                <p className="text-sm text-purple-400 font-medium">📂 {subCol.title}</p>
                                {subCol.tasks && subCol.tasks.length > 0 && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    {subCol.tasks.length} tarefa(s)
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks (formato antigo) */}
              {preview.tasks && preview.tasks.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">
                    {preview.tasks.length} tarefa(s) a importar (formato antigo):
                  </p>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {preview.tasks.map((task: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 bg-gray-900/50 rounded-lg border border-gray-700"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-white font-medium">{task.title}</p>
                            {task.description && (
                              <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                            )}
                            <div className="flex items-center space-x-3 mt-2">
                              <span className="text-xs text-gray-500">
                                Coluna: <span className="text-blue-400">{task.column}</span>
                              </span>
                              {task.priority && (
                                <span className={`text-xs px-2 py-0.5 rounded ${
                                  task.priority === 'high' ? 'bg-red-900/30 text-red-400' :
                                  task.priority === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                                  'bg-green-900/30 text-green-400'
                                }`}>
                                  {task.priority}
                                </span>
                              )}
                              {task.assignee && (
                                <span className="text-xs text-gray-500">
                                  👤 {task.assignee}
                                </span>
                              )}
                            </div>
                            {task.tags && task.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {task.tags.map((tag: string, tagIdx: number) => (
                                  <span
                                    key={tagIdx}
                                    className="text-xs px-2 py-0.5 bg-gray-700 text-gray-300 rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Import Button */}
              <button
                onClick={handleImport}
                className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Importar Tudo</span>
              </button>
            </div>
          )}

          {/* Help */}
          <div className="mt-6 p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
            <h4 className="text-sm font-semibold text-white mb-3">📖 Formatos JSON Suportados</h4>

            <div className="mb-3">
              <p className="text-xs font-semibold text-purple-400 mb-1">✨ Formato Novo (com SubColunas):</p>
              <ul className="text-xs text-gray-400 space-y-1 ml-3">
                <li>• <span className="text-blue-400">columns[].subColumns</span>: Array de subcolunas</li>
                <li>• <span className="text-blue-400">subColumns[].title</span> (obrigatório): Título da subcoluna</li>
                <li>• <span className="text-blue-400">subColumns[].tasks</span>: Array de tarefas da subcoluna</li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 mb-1">📦 Formato Antigo (retrocompatível):</p>
              <ul className="text-xs text-gray-400 space-y-1 ml-3">
                <li>• <span className="text-blue-400">tasks</span>: Array de tarefas direto</li>
                <li>• <span className="text-blue-400">column</span> (obrigatório): ID da coluna destino</li>
              </ul>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-700">
              <p className="text-xs font-semibold text-gray-300 mb-1">Campos de Task:</p>
              <ul className="text-xs text-gray-400 space-y-1 ml-3">
                <li>• <span className="text-blue-400">title</span> (obrigatório): Título da tarefa</li>
                <li>• <span className="text-gray-300">description</span> (opcional): Descrição</li>
                <li>• <span className="text-gray-300">priority</span> (opcional): high, medium, low</li>
                <li>• <span className="text-gray-300">dueDate</span> (opcional): Data no formato YYYY-MM-DD</li>
                <li>• <span className="text-gray-300">assignee</span> (opcional): Nome do responsável</li>
                <li>• <span className="text-gray-300">tags</span> (opcional): Array de strings</li>
                <li>• <span className="text-gray-300">checklist</span> (opcional): Array de strings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};