import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../config/api";
import type { Pedido, Entregador } from "../../types/entities";
import Layout from "../../components/layout";
import StatusBadge from "../../components/status-badge";
import * as Styled from "./index.style";

const STATUS_ORDER = ["Pendente", "Confirmado", "Em Preparo", "Em Entrega", "Entregue"];

const AcompanhamentoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [pedidoId, setPedidoId] = useState(id || "");
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [entregador, setEntregador] = useState<Entregador | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      loadPedido(parseInt(id));
      
      // Polling a cada 10 segundos
      const interval = setInterval(() => {
        loadPedido(parseInt(id));
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [id]);

  const loadPedido = async (id: number) => {
    try {
      setLoading(true);
      setError("");
      const pedidoData = await api.pedidos.getById(id);
      setPedido(pedidoData);

      if (pedidoData.entregadorId) {
        const entregadorData = await api.entregadores.getById(pedidoData.entregadorId);
        setEntregador(entregadorData);
      }
    } catch (err: any) {
      console.error(err);
      setError("Pedido não encontrado");
    } finally {
      setLoading(false);
    }
  };

  const handleBuscar = () => {
    if (pedidoId) {
      loadPedido(parseInt(pedidoId));
    }
  };

  const currentStatusIndex = pedido ? STATUS_ORDER.indexOf(pedido.status) : -1;

  return (
    <Layout>
      <Styled.Container>
        <Styled.Title>Acompanhar Pedido</Styled.Title>

        <Styled.SearchSection>
          <Styled.Input
            type="number"
            placeholder="Digite o número do pedido"
            value={pedidoId}
            onChange={(e) => setPedidoId(e.target.value)}
          />
          <Styled.SearchButton onClick={handleBuscar}>Buscar</Styled.SearchButton>
        </Styled.SearchSection>

        {loading && <Styled.Loading>Carregando...</Styled.Loading>}

        {error && <Styled.Error>{error}</Styled.Error>}

        {pedido && !loading && (
          <>
            <Styled.Card>
              <Styled.PedidoHeader>
                <Styled.PedidoNumero>
                  Pedido #{pedido.pedidoId.toString().padStart(4, "0")}
                </Styled.PedidoNumero>
                <StatusBadge status={pedido.status} />
              </Styled.PedidoHeader>

              <Styled.Info>
                <Styled.InfoRow>
                  <span>Data do Pedido:</span>
                  <span>{new Date(pedido.dataPedido).toLocaleString("pt-BR")}</span>
                </Styled.InfoRow>
                <Styled.InfoRow>
                  <span>Valor Total:</span>
                  <span>R$ {pedido.valorTotal.toFixed(2)}</span>
                </Styled.InfoRow>
                {entregador && (
                  <>
                    <Styled.InfoRow>
                      <span>Entregador:</span>
                      <span>{entregador.nome}</span>
                    </Styled.InfoRow>
                    <Styled.InfoRow>
                      <span>Telefone:</span>
                      <span>{entregador.telefone}</span>
                    </Styled.InfoRow>
                    {entregador.veiculo && (
                      <Styled.InfoRow>
                        <span>Veículo:</span>
                        <span>
                          {entregador.veiculo} - {entregador.placa}
                        </span>
                      </Styled.InfoRow>
                    )}
                  </>
                )}
              </Styled.Info>
            </Styled.Card>

            <Styled.Card>
              <Styled.SectionTitle>Status do Pedido</Styled.SectionTitle>
              <Styled.Timeline>
                {STATUS_ORDER.map((status, index) => {
                  const isCompleted = index <= currentStatusIndex;
                  const isCurrent = index === currentStatusIndex;

                  return (
                    <Styled.TimelineItem key={status} completed={isCompleted}>
                      <Styled.TimelineIcon completed={isCompleted} current={isCurrent}>
                        {isCompleted ? "✓" : index + 1}
                      </Styled.TimelineIcon>
                      <Styled.TimelineContent>
                        <Styled.TimelineStatus completed={isCompleted}>
                          {status}
                        </Styled.TimelineStatus>
                      </Styled.TimelineContent>
                    </Styled.TimelineItem>
                  );
                })}
                {pedido.status === "Cancelado" && (
                  <Styled.TimelineItem completed={false}>
                    <Styled.TimelineIcon completed={false} current={true} canceled>
                      ✕
                    </Styled.TimelineIcon>
                    <Styled.TimelineContent>
                      <Styled.TimelineStatus completed={false}>Cancelado</Styled.TimelineStatus>
                    </Styled.TimelineContent>
                  </Styled.TimelineItem>
                )}
              </Styled.Timeline>
            </Styled.Card>

            <Styled.RefreshInfo>
              Atualização automática a cada 10 segundos
            </Styled.RefreshInfo>
          </>
        )}
      </Styled.Container>
    </Layout>
  );
};

export default AcompanhamentoPage;
