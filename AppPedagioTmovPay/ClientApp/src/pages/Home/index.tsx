import React, { useState, useEffect, useCallback } from 'react';
import { FaCreditCard, FaUserAlt, FaSpinner } from 'react-icons/fa';
import { format } from 'date-fns';
import Box from '../../components/Box';
import Button from '../../components/Button';
import ItemLancamento from '../../components/ItemLancamento';
import AnimationBox from '../../components/AnimationBox';
import { formatarDinheiro } from '../../helper/util';

import {
  Container,
  Content,
  ContainerButton,
  InfoHeader,
  Description,
  LocalLabel,
  LocalInfo,
  LocalItemPedagio,
} from './styles';

interface Message {
  message: string;
  color: string;
}
interface DataCard {
  ativo?: boolean;
  nomeImpresso?: string;
  saldo?: string;
}

interface DataProps {
  idParcela?: number;
  idContrato?: number;
  valorOriginal?: string;
  tipo?: string;
  status?: string;
}

enum EStatusCardReader {
  cardPresent,
  cardNotPresent,
  cardReaderNotPresent,
}

const colors = {
  success: '#b7eb8f',
  warning: '#ffe58f',
  danger: '#ffccc7',
};

let globalCalculaValor: (a: DataProps[]) => void;
let globalDisableButton: (a: boolean) => void;
let globalSetStatusMessage: (a: string) => void;

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [selecionados, setSelecionados] = React.useState<DataProps[]>([]);
  const [statusCardReader, setStatusCardReader] = React.useState(2);
  const [dataCard, setDataCard] = React.useState<DataCard>({
    ativo: false,
    nomeImpresso: '',
    saldo: '',
  });
  const [listPedagios, setListPedagios] = React.useState<DataProps[]>([]);

  const [messages, setMessages] = useState<Message[]>([
    {
      message: ` Carregando o sistema...`,
      color: colors.warning,
    },
  ]);

  const handleGetListPedagio = useCallback(async () => {
    setLoadingList(true);
    try {
      const response = await fetch('Pedagio/BuscarPedagiosPorPan');
      const data = await response.json();
      setListPedagios(data);
    } catch (err) {
      setListPedagios([]);
    } finally {
      setLoadingList(false);
    }
  }, []);

  const handleBalanceOnClick = useCallback(async () => {
    setLoading(true);
    setDataCard({});
    setSelecionados([]);
    try {
      const response = await fetch('Pedagio/BuscarDadosPorPan');
      const data = await response.json();

      if (!data.nomeImpresso) {
        data.nomeImpresso = 'Não localizado';
      }
      setDataCard(data);
      handleGetListPedagio();
    } catch (err) {
      setDataCard({});
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    setDataCard({});
    setSelecionados([]);
    setListPedagios([]);

    if (statusCardReader === EStatusCardReader.cardPresent) {
      handleBalanceOnClick();
    }
  }, [statusCardReader, handleBalanceOnClick]);

  const onChangeItem = (item: DataProps, selected: boolean): boolean => {
    const novoArray = selecionados;

    if (novoArray.length > 0) {
      if (item.status === novoArray[0].status) {
        if (selected) {
          novoArray.push(item);
        } else {
          const index = novoArray.findIndex((find) => {
            return find.idContrato === item.idContrato;
          });

          novoArray.splice(index, 1);
        }

        setSelecionados(novoArray);
        globalCalculaValor(novoArray);
        globalDisableButton(novoArray.length > 0);
        return true;
      }
      return false;
    }
    novoArray.push(item);

    setSelecionados(novoArray);
    globalCalculaValor(novoArray);
    globalDisableButton(novoArray.length > 0);
    return true;
  };

  const FooterButtons: React.FC = () => {
    const [loadingButton, setLoadingButton] = React.useState<boolean>(false);
    const [enable, setEnable] = React.useState<boolean>(false);

    globalDisableButton = setEnable;

    const handleRechargeOnClick = useCallback(async () => {
      setEnable(false);
      setLoadingButton(true);
      globalSetStatusMessage(
        `[${format(
          new Date(),
          'dd/MM/yyyy hh:mm:ss',
        )}] - Processando recarga...`,
      );
      try {
        const response = await fetch('Pedagio/RechargeCard', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selecionados),
        });
        await response.json();
        globalSetStatusMessage(
          `[${format(
            new Date(),
            'dd/MM/yyyy hh:mm:ss',
          )}] - Recarga realizada com sucesso`,
        );

        handleBalanceOnClick();
      } catch (err) {
        globalSetStatusMessage(
          `[${format(
            new Date(),
            'dd/MM/yyyy hh:mm:ss',
          )}] - Não foi possível realizar a recarga...`,
        );
      } finally {
        setEnable(true);
        setLoadingButton(false);
      }
    }, []);

    const handleEstornoOnClick = useCallback(async () => {
      setEnable(false);
      setLoadingButton(true);
      globalSetStatusMessage(
        `[${format(
          new Date(),
          'dd/MM/yyyy hh:mm:ss',
        )}] - Processando estorno...`,
      );
      try {
        const response = await fetch('Pedagio/EstornoCard', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selecionados),
        });

        globalSetStatusMessage(
          `[${format(
            new Date(),
            'dd/MM/yyyy hh:mm:ss',
          )}] - Estorno realizado com sucesso!`,
        );

        handleBalanceOnClick();
      } catch (err) {
        globalSetStatusMessage(
          `[${format(
            new Date(),
            'dd/MM/yyyy hh:mm:ss',
          )}] -Não foi possível realizar o estorno...`,
        );
      } finally {
        setEnable(true);
        setLoadingButton(false);
      }
    }, []);

    return (
      <ContainerButton>
        <Button
          onClick={handleEstornoOnClick}
          disabled={!enable}
          loading={loading || loadingButton}
        >
          Estornar Saldo
        </Button>
        <Button
          onClick={handleRechargeOnClick}
          disabled={!enable}
          loading={loading || loadingButton}
        >
          Carregar Cartão
        </Button>
      </ContainerButton>
    );
  };

  const memoListPedagios = React.useMemo(() => {
    const render = (
      <>
        {listPedagios.length > 0 ? (
          <LocalItemPedagio>
            {listPedagios.map((item) => (
              <ItemLancamento
                key={item.idParcela}
                data={item}
                onChange={(a, selected) => onChangeItem(a, selected)}
              />
            ))}
          </LocalItemPedagio>
        ) : (
          <p>Nenhum lancamento encontrado!</p>
        )}
      </>
    );

    return (
      <>
        <Box
          scrollbar
          containerStyle={{
            borderRadius: 0,
            height: 450,
            background: '#fff',
            border: 'none',
            padding: 0,
            paddingRight: 10,
            marginTop: 50,
          }}
        >
          <Description>Lista de parcelas de pedágios</Description>
          {loadingList ? <FaSpinner /> : render}
        </Box>
      </>
    );
  }, [listPedagios, loadingList]);

  const ValorSelecionado: React.FC = () => {
    const [label, setLabel] = useState<string>('Valor selecionado');
    const [valorSelecionado, setValorSelecionado] = useState<number>(0);
    const [statusMessage, setStatusMessage] = useState<string>('');

    const calculaValor = (arrayValor: DataProps[]): void => {
      let sum = 0;
      arrayValor.forEach((val) => {
        sum += Number(val.valorOriginal);
      });

      setValorSelecionado(sum);

      if (arrayValor[0]?.status) {
        if (arrayValor[0].status === 'EM_ABERTO') {
          setLabel(`Valor selecionado para recarga`);
        } else {
          setLabel(`Valor selecionado para estorno`);
        }
      } else {
        setLabel(`Valor selecionado`);
      }
    };

    globalCalculaValor = calculaValor;
    globalSetStatusMessage = setStatusMessage;

    return (
      <LocalLabel>
        <h3 style={{ color: '#999', fontWeight: 500 }}>{label}</h3>
        <h3
          style={{
            fontWeight: 600,
            color:
              selecionados[0]?.status === 'EM_ABERTO'
                ? 'rgb(67 181 39)'
                : 'rgb(186, 63, 63)',
          }}
        >
          {formatarDinheiro(valorSelecionado)}
        </h3>
        <div style={{ display: 'flex', flex: 1, alignItems: 'flex-end' }}>
          <h3
            style={{
              fontWeight: 400,
            }}
          >
            {statusMessage}
          </h3>
        </div>
      </LocalLabel>
    );
  };

  const DataUserCard: React.FC = () => {
    return (
      <>
        <Description>Dados do cartão</Description>
        <LocalInfo>
          <div style={{ flex: 1 }}>
            <LocalLabel>
              <span>
                <FaUserAlt style={{ marginRight: 9 }} />
                Nome
              </span>
              <p>{dataCard.nomeImpresso ?? ' - '}</p>
            </LocalLabel>
            <LocalLabel>
              <span>
                <FaCreditCard style={{ marginRight: 9 }} />
                Saldo
              </span>
              <p>
                {dataCard.saldo || Number(dataCard.saldo) === 0
                  ? formatarDinheiro(String(dataCard.saldo))
                  : ' - '}
              </p>
            </LocalLabel>
          </div>
          <ValorSelecionado />
        </LocalInfo>
      </>
    );
  };

  const CardReader: React.FC = () => {
    if (loading) {
      return <FaSpinner />;
    }

    return (
      <>
        <DataUserCard />
        {memoListPedagios}
        <FooterButtons />
      </>
    );
  };

  return (
    <Container>
      <AnimationBox onChange={(a) => setStatusCardReader(a)} />
      <Content>
        <InfoHeader>
          <CardReader />
        </InfoHeader>
      </Content>
    </Container>
  );
};

export default Home;
