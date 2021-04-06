import React from 'react';

import { FaMoneyBillAlt, FaHashtag, FaCarAlt, FaCheck } from 'react-icons/fa';
import { Container, Tag, LocalLabel, Check } from './styles';

interface DataProps {
  idParcela?: number;
  idContrato?: number;
  valorOriginal?: string;
  tipo?: string;
  status?: string;
}

interface ItemLancamentoProps {
  data: DataProps;
  onChange?: (a: DataProps, selected: boolean) => boolean;
}

const ItemLancamento: React.FC<ItemLancamentoProps> = ({ data, onChange }) => {
  const [ative, setActive] = React.useState<boolean>(false);

  const getLabelStatus = (status?: string): string => {
    switch (status) {
      case 'PAGO_EMBARCADOR':
        return 'Quitado';
      case 'EM_ABERTO':
        return 'Em aberto';
      default:
        return ' - ';
    }
  };

  const handleSelection = (): void => {
    if (onChange) {
      if (onChange(data, !ative)) {
        setActive((old) => !old);
      }
    } else {
      setActive((old) => !old);
    }
  };

  return (
    <Container onClick={() => handleSelection()}>
      <Check active={ative}>{ative && <FaCheck />}</Check>
      <Tag status={data.status}>
        <span>{getLabelStatus(data.status)}</span>
      </Tag>
      <LocalLabel style={{ flex: 1 }}>
        <span>
          <FaHashtag style={{ marginRight: 9 }} />
          ID parcela
        </span>
        <p>{data.idParcela}</p>
      </LocalLabel>
      <LocalLabel style={{ flex: 1 }}>
        <span>
          <FaMoneyBillAlt style={{ marginRight: 9 }} />
          Valor original
        </span>
        <p>R$: {data.valorOriginal}</p>
      </LocalLabel>
      <LocalLabel style={{ flex: 1 }}>
        <span>
          <FaCarAlt style={{ marginRight: 9 }} />
          Tipo
        </span>
        <p>{data.tipo}</p>
      </LocalLabel>
    </Container>
  );
};

export default ItemLancamento;
