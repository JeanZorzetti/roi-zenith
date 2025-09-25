import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2, Mail, Users, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface BoardMember {
  id: string;
  email: string;
  name?: string;
  permission: 'view' | 'edit' | 'admin';
  invitedAt: string;
  acceptedAt?: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  inviteToken?: string;
}

interface Board {
  id: string;
  title: string;
  description?: string;
  color: string;
  isFavorite: boolean;
  createdAt: string;
  columns: any[];
  owner?: string;
  members?: BoardMember[];
  isShared?: boolean;
}

const InvitePage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState<{
    board: Board | null;
    member: BoardMember | null;
    valid: boolean;
    message: string;
  }>({ board: null, member: null, valid: false, message: '' });
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (token) {
      validateInvite(token);
    }
  }, [token]);

  const validateInvite = (inviteToken: string) => {
    try {
      console.log('Validating token:', inviteToken);

      // Primeiro tentar decodificar o token diretamente (para nova janela)
      let tokenData: any = null;
      try {
        const base64Token = inviteToken
          .replace(/-/g, '+')
          .replace(/_/g, '/');
        const padding = 4 - (base64Token.length % 4);
        const paddedToken = base64Token + '='.repeat(padding % 4);
        const decoded = atob(paddedToken);
        tokenData = JSON.parse(decoded);
        console.log('Token decodificado:', tokenData);
      } catch (e) {
        console.log('Erro ao decodificar token, tentando método antigo...');
      }

      // Se conseguiu decodificar o token, usar os dados dele
      if (tokenData && tokenData.boardId) {
        // Verificar no localStorage se o convite ainda está válido
        const savedData = localStorage.getItem('kanban-boards');
        const boards: Board[] = savedData ? JSON.parse(savedData) : [];

        let foundBoard: Board | null = null;
        let foundMember: BoardMember | null = null;

        // Procurar pelo board no localStorage
        const localBoard = boards.find(b => b.id === tokenData.boardId);
        if (localBoard && localBoard.members) {
          const member = localBoard.members.find(m =>
            m.inviteToken === inviteToken && m.status === 'pending'
          );
          if (member) {
            foundBoard = localBoard;
            foundMember = member;
          }
        }

        // Se não encontrou no localStorage mas tem o token válido, criar board temporário
        if (!foundBoard) {
          foundBoard = {
            id: tokenData.boardId,
            title: tokenData.boardTitle,
            description: tokenData.boardDescription,
            color: tokenData.boardColor,
            isFavorite: false,
            createdAt: new Date().toISOString(),
            columns: [],
            isShared: true
          };

          foundMember = {
            id: `temp_member_${tokenData.timestamp}`,
            email: tokenData.email,
            permission: tokenData.permission,
            invitedAt: new Date(tokenData.timestamp).toISOString(),
            status: 'pending',
            inviteToken
          };
        }

        setInvite({
          board: foundBoard,
          member: foundMember,
          valid: true,
          message: 'Convite válido encontrado!'
        });
        return;
      }

      // Método antigo: Buscar no localStorage diretamente
      const savedData = localStorage.getItem('kanban-boards');
      const boards: Board[] = savedData ? JSON.parse(savedData) : [];

      console.log('Found boards:', boards.length);

      let foundBoard: Board | null = null;
      let foundMember: BoardMember | null = null;

      for (const board of boards) {
        console.log(`Checking board: ${board.title} (${board.id})`);
        if (board.members) {
          console.log(`Board has ${board.members.length} members`);
          board.members.forEach((member, index) => {
            console.log(`Member ${index}: ${member.email}, token: ${member.inviteToken}, status: ${member.status}`);
          });

          const member = board.members.find(m =>
            m.inviteToken === inviteToken && m.status === 'pending'
          );

          if (member) {
            console.log('Found matching member:', member);
            foundBoard = board;
            foundMember = member;
            break;
          }
        } else {
          console.log('Board has no members');
        }
      }

      if (foundBoard && foundMember) {
        setInvite({
          board: foundBoard,
          member: foundMember,
          valid: true,
          message: 'Convite válido encontrado!'
        });
      } else {
        setInvite({
          board: null,
          member: null,
          valid: false,
          message: 'Convite inválido ou expirado.'
        });
      }
    } catch (error) {
      setInvite({
        board: null,
        member: null,
        valid: false,
        message: 'Erro ao validar convite.'
      });
    } finally {
      setLoading(false);
    }
  };

  const acceptInvite = () => {
    if (!invite.board || !invite.member) return;

    try {
      const savedData = localStorage.getItem('kanban-boards');
      const boards: Board[] = savedData ? JSON.parse(savedData) : [];

      // Verificar se o board já existe no localStorage
      const existingBoardIndex = boards.findIndex(b => b.id === invite.board!.id);

      let updatedBoards: Board[];

      if (existingBoardIndex >= 0) {
        // Board existe, atualizar o membro
        updatedBoards = boards.map(board => {
          if (board.id === invite.board!.id) {
            return {
              ...board,
              members: board.members?.map(member => {
                if (member.id === invite.member!.id || member.inviteToken === invite.member!.inviteToken) {
                  return {
                    ...member,
                    status: 'accepted' as const,
                    acceptedAt: new Date().toISOString(),
                    name: userName.trim() || undefined
                  };
                }
                return member;
              })
            };
          }
          return board;
        });
      } else {
        // Board não existe (caso nova janela), criar o board com o membro
        const newBoard: Board = {
          ...invite.board!,
          members: [{
            ...invite.member!,
            status: 'accepted' as const,
            acceptedAt: new Date().toISOString(),
            name: userName.trim() || undefined
          }]
        };
        updatedBoards = [...boards, newBoard];
      }

      localStorage.setItem('kanban-boards', JSON.stringify(updatedBoards));

      // Criar sessão simplificada para o convidado
      const guestSession = {
        email: invite.member.email,
        name: userName.trim() || invite.member.email.split('@')[0],
        boardAccess: [{
          boardId: invite.board.id,
          permission: invite.member.permission
        }],
        isGuest: true,
        joinedAt: new Date().toISOString()
      };

      localStorage.setItem('guest-session', JSON.stringify(guestSession));

      // Redirecionar para o quadro
      setTimeout(() => {
        navigate(`/dashboard/tasks?board=${invite.board!.id}&guest=true`);
      }, 2000);

      setInvite(prev => ({ ...prev, message: 'Convite aceito com sucesso! Redirecionando...' }));

    } catch (error) {
      setInvite(prev => ({ ...prev, message: 'Erro ao aceitar convite. Tente novamente.' }));
    }
  };

  const declineInvite = () => {
    if (!invite.board || !invite.member) return;

    try {
      const savedData = localStorage.getItem('kanban-boards');
      const boards: Board[] = savedData ? JSON.parse(savedData) : [];

      const updatedBoards = boards.map(board => {
        if (board.id === invite.board!.id) {
          return {
            ...board,
            members: board.members?.map(member => {
              if (member.id === invite.member!.id) {
                return {
                  ...member,
                  status: 'declined' as const
                };
              }
              return member;
            })
          };
        }
        return board;
      });

      localStorage.setItem('kanban-boards', JSON.stringify(updatedBoards));
      setInvite(prev => ({ ...prev, message: 'Convite recusado.' }));

    } catch (error) {
      setInvite(prev => ({ ...prev, message: 'Erro ao recusar convite.' }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="text-gray-300 mt-4">Validando convite...</p>
        </div>
      </div>
    );
  }

  if (!invite.valid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 w-full max-w-md text-center">
          <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">Convite Inválido</h1>
          <p className="text-gray-300 mb-6">{invite.message}</p>
          <button
            onClick={() => navigate('/dashboard/tasks')}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 px-6 py-3 rounded-lg text-white transition-all duration-300"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Share2 className="h-8 w-8 text-primary-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Convite para Quadro</h1>
          <p className="text-gray-300">Você foi convidado para colaborar</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-800/30 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-10 h-10 ${invite.board?.color || 'bg-blue-500'} rounded-xl flex items-center justify-center`}>
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">{invite.board?.title}</h3>
                <p className="text-gray-400 text-sm">{invite.board?.description || 'Quadro Kanban'}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>{invite.member?.email}</span>
              </div>
              <div className={`px-2 py-1 rounded text-xs ${
                invite.member?.permission === 'edit'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                {invite.member?.permission === 'edit' ? '✏️ Editor' : '👀 Visualizador'}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Seu nome (opcional)
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              placeholder="Como você gostaria de aparecer no quadro?"
            />
          </div>
        </div>

        {invite.member?.status === 'accepted' ? (
          <div className="text-center">
            <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <p className="text-green-400 font-medium">Convite já aceito!</p>
            <button
              onClick={() => navigate(`/dashboard/tasks?board=${invite.board?.id}&guest=true`)}
              className="mt-4 w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 px-4 py-3 rounded-lg text-white transition-all duration-300"
            >
              Acessar Quadro
            </button>
          </div>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={declineInvite}
              className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              Recusar
            </button>
            <button
              onClick={acceptInvite}
              className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 px-4 py-3 rounded-lg text-white transition-all duration-300"
            >
              Aceitar Convite
            </button>
          </div>
        )}

        <p className="text-center text-xs text-gray-500 mt-4">
          <Clock className="h-3 w-3 inline mr-1" />
          Convidado em {new Date(invite.member?.invitedAt || '').toLocaleDateString('pt-BR')}
        </p>
      </div>
    </div>
  );
};

export default InvitePage;