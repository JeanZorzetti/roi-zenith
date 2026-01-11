import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { error: 'Banco de dados não configurado. Configure o Prisma e as variáveis de ambiente.' },
    { status: 501 }
  );
}
