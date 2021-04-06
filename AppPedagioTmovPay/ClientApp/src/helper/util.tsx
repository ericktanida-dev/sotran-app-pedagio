export const formatarDinheiro = (valor: string | number): string => {
  if (valor || valor === 0) {
    const novoValor = Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return String(novoValor);
  }

  return '';
};
