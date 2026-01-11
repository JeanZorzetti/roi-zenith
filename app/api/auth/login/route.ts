import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // TODO: Conectar com banco de dados
    // Por enquanto, retorna erro informando que o banco não está configurado
    return NextResponse.json(
      { error: 'Banco de dados não configurado. Configure o Prisma e as variáveis de ambiente.' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
