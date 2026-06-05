import * as Styled from "./index.style";

interface StatusBadgeProps {
  status: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  Pendente: { label: "Pendente", color: "var(--color-warning)" },
  Confirmado: { label: "Confirmado", color: "var(--color-secondary)" },
  "Em Preparo": { label: "Em Preparo", color: "var(--color-primary)" },
  "Em Entrega": { label: "Em Entrega", color: "var(--color-primary)" },
  Entregue: { label: "Entregue", color: "var(--color-success)" },
  Cancelado: { label: "Cancelado", color: "var(--color-error)" },
  Pago: { label: "Pago", color: "var(--color-success)" },
  Processando: { label: "Processando", color: "var(--color-warning)" },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = STATUS_CONFIG[status] || { label: status, color: "var(--color-text-muted)" };

  return <Styled.Badge color={config.color}>{config.label}</Styled.Badge>;
};

export default StatusBadge;
