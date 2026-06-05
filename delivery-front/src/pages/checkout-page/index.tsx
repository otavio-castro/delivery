import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrinhoStore } from "../../stores/carrinho.store";
import { api } from "../../config/api";
import type { Cliente, Endereco } from "../../types/entities";
import Layout from "../../components/layout";
import Input from "../../components/input";
import Select from "../../components/select";
import Button from "../../components/button";
import * as Styled from "./index.style";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { itens, getTotal, restauranteId, clear } = useCarrinhoStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estado para clientes e endereços
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteSelecionadoId, setClienteSelecionadoId] = useState<string>("");
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [enderecoSelecionadoId, setEnderecoSelecionadoId] = useState<string>("");
  const [loadingEnderecos, setLoadingEnderecos] = useState(false);

  const [formData, setFormData] = useState({
    // Cliente
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    // Endereço
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "SP",
    cep: "",
    // Pagamento
    metodoPagamento: "Cartao",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Carregar clientes ao montar o componente
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await api.clientes.getAll();
        setClientes(data);
      } catch (err) {
        console.error("Erro ao carregar clientes:", err);
      }
    };
    fetchClientes();
  }, []);

  // Carregar endereços quando selecionar um cliente
  useEffect(() => {
    const fetchEnderecos = async () => {
      if (!clienteSelecionadoId) {
        setEnderecos([]);
        setEnderecoSelecionadoId("");
        return;
      }

      try {
        setLoadingEnderecos(true);
        const data = await api.enderecos.getAll(Number(clienteSelecionadoId));
        setEnderecos(data);
      } catch (err) {
        console.error("Erro ao carregar endereços:", err);
        setEnderecos([]);
      } finally {
        setLoadingEnderecos(false);
      }
    };
    fetchEnderecos();
  }, [clienteSelecionadoId]);

  if (itens.length === 0) {
    navigate("/");
    return null;
  }

  const handleClienteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const clienteId = e.target.value;
    setClienteSelecionadoId(clienteId);
    setEnderecoSelecionadoId("");
    
    // Limpar dados do formulário quando mudar de cliente
    if (clienteId) {
      setFormData({
        ...formData,
        nome: "",
        email: "",
        telefone: "",
        cpf: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "SP",
        cep: "",
      });
    }
  };

  const handleEnderecoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const enderecoId = e.target.value;
    setEnderecoSelecionadoId(enderecoId);
    
    // Limpar campos de endereço quando mudar
    if (enderecoId) {
      setFormData({
        ...formData,
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "SP",
        cep: "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove não-dígitos
    
    // Limita a 8 dígitos
    if (value.length > 8) value = value.slice(0, 8);
    
    // Aplica máscara 00000-000
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    
    setFormData({ ...formData, cep: value });
    setErrors({ ...errors, cep: "" });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Se não selecionou cliente existente, validar dados pessoais
    if (!clienteSelecionadoId) {
      if (!formData.nome) newErrors.nome = "Nome é obrigatório";
      if (!formData.email) newErrors.email = "Email é obrigatório";
      if (!formData.telefone) newErrors.telefone = "Telefone é obrigatório";
    }

    // Se não selecionou endereço existente, validar dados de endereço
    if (!enderecoSelecionadoId) {
      if (!formData.logradouro) newErrors.logradouro = "Logradouro é obrigatório";
      if (!formData.numero) newErrors.numero = "Número é obrigatório";
      if (!formData.bairro) newErrors.bairro = "Bairro é obrigatório";
      if (!formData.cidade) newErrors.cidade = "Cidade é obrigatória";
      if (!formData.cep) newErrors.cep = "CEP é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      setError("");

      let clienteId: number;
      let enderecoId: number;

      // Cenário 1: Cliente existente
      if (clienteSelecionadoId) {
        clienteId = Number(clienteSelecionadoId);

        // Cenário 1a: Endereço existente
        if (enderecoSelecionadoId) {
          enderecoId = Number(enderecoSelecionadoId);
        } 
        // Cenário 1b: Novo endereço para cliente existente
        else {
          const endereco = await api.enderecos.create({
            clienteId,
            logradouro: formData.logradouro,
            numero: formData.numero,
            complemento: formData.complemento || null,
            bairro: formData.bairro,
            cidade: formData.cidade,
            estado: formData.estado,
            cep: formData.cep,
          });
          enderecoId = endereco.enderecoId;
        }
      } 
      // Cenário 2: Novo cliente
      else {
        // Criar cliente
        const cliente = await api.clientes.create({
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          cpf: formData.cpf || null,
        });
        clienteId = cliente.clienteId;

        // Criar endereço
        const endereco = await api.enderecos.create({
          clienteId,
          logradouro: formData.logradouro,
          numero: formData.numero,
          complemento: formData.complemento || null,
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado,
          cep: formData.cep,
        });
        enderecoId = endereco.enderecoId;
      }

      // 3. Criar pedido
      const pedido = await api.pedidos.create({
        clienteId,
        restauranteId: restauranteId!,
        enderecoId,
        entregadorId: null,
        valorTotal: getTotal() + 5, // total + taxa de entrega
        observacao: null,
      });

      // 4. Criar itens do pedido
      await Promise.all(
        itens.map((item) =>
          api.itensPedido.create({
            pedidoId: pedido.pedidoId,
            produtoId: item.produto.produtoId,
            quantidade: item.quantidade,
            precoUnitario: item.produto.preco,
          })
        )
      );

      // 5. Criar pagamento
      await api.pagamentos.create({
        pedidoId: pedido.pedidoId,
        metodoPagamento: formData.metodoPagamento,
        valor: getTotal() + 5,
      });

      // Limpar carrinho
      clear();

      // Redirecionar para confirmação
      navigate(`/confirmacao/${pedido.pedidoId}`);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Erro ao finalizar pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Styled.Container>
        <Styled.Title>Finalizar Pedido</Styled.Title>

        {error && <Styled.Error>{error}</Styled.Error>}

        <Styled.Content>
          <Styled.Form onSubmit={handleSubmit}>
            {/* Seleção de Cliente */}
            <Styled.Section>
              <Styled.SectionTitle>Selecione o Cliente</Styled.SectionTitle>
              <Select
                label="Cliente"
                name="cliente"
                value={clienteSelecionadoId}
                onChange={handleClienteChange}
                options={[
                  { value: "", label: "Novo Cliente" },
                  ...clientes.map((c) => ({
                    value: c.clienteId,
                    label: `${c.nome} - ${c.email}`,
                  })),
                ]}
              />
            </Styled.Section>

            {/* Dados Pessoais - só mostra se for novo cliente */}
            {!clienteSelecionadoId && (
              <Styled.Section>
                <Styled.SectionTitle>Dados Pessoais</Styled.SectionTitle>
                <Styled.FormGrid>
                  <Input
                    label="Nome Completo *"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    error={errors.nome}
                  />
                  <Input
                    label="Email *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                  <Input
                    label="Telefone *"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    error={errors.telefone}
                    placeholder="(11) 99999-9999"
                  />
                  <Input
                    label="CPF"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    placeholder="000.000.000-00"
                  />
                </Styled.FormGrid>
              </Styled.Section>
            )}

            {/* Seleção de Endereço - só mostra se selecionou cliente existente */}
            {clienteSelecionadoId && (
              <Styled.Section>
                <Styled.SectionTitle>Selecione o Endereço</Styled.SectionTitle>
                {loadingEnderecos ? (
                  <Styled.LoadingText>Carregando endereços...</Styled.LoadingText>
                ) : (
                  <Select
                    label="Endereço de Entrega"
                    name="endereco"
                    value={enderecoSelecionadoId}
                    onChange={handleEnderecoChange}
                    options={[
                      { value: "", label: "Novo Endereço" },
                      ...enderecos.map((e) => ({
                        value: e.enderecoId,
                        label: `${e.logradouro}, ${e.numero} - ${e.bairro}`,
                      })),
                    ]}
                  />
                )}
              </Styled.Section>
            )}

            {/* Campos de Endereço - só mostra se não selecionou endereço existente */}
            {!enderecoSelecionadoId && (
              <Styled.Section>
                <Styled.SectionTitle>Endereço de Entrega</Styled.SectionTitle>
                <Styled.FormGrid>
                  <Input
                    label="CEP *"
                    name="cep"
                    value={formData.cep}
                    onChange={handleCepChange}
                    error={errors.cep}
                    placeholder="00000-000"
                    maxLength={9}
                  />
                  <Input
                    label="Logradouro *"
                    name="logradouro"
                    value={formData.logradouro}
                    onChange={handleChange}
                    error={errors.logradouro}
                    placeholder="Nome da rua"
                  />
                  <Input
                    label="Número *"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    error={errors.numero}
                  />
                  <Input
                    label="Complemento"
                    name="complemento"
                    value={formData.complemento}
                    onChange={handleChange}
                  />
                  <Input
                    label="Bairro *"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                    error={errors.bairro}
                  />
                  <Input
                    label="Cidade *"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    error={errors.cidade}
                  />
                  <Select
                    label="Estado *"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    options={[
                      { value: "SP", label: "São Paulo" },
                      { value: "RJ", label: "Rio de Janeiro" },
                      { value: "MG", label: "Minas Gerais" },
                    ]}
                  />
                </Styled.FormGrid>
              </Styled.Section>
            )}

            <Styled.Section>
              <Styled.SectionTitle>Método de Pagamento</Styled.SectionTitle>
              <Select
                label="Escolha o método de pagamento *"
                name="metodoPagamento"
                value={formData.metodoPagamento}
                onChange={handleChange}
                options={[
                  { value: "Cartao", label: "Cartão de Crédito/Débito" },
                  { value: "PIX", label: "PIX" },
                  { value: "Dinheiro", label: "Dinheiro" },
                ]}
              />
            </Styled.Section>
          </Styled.Form>

          <Styled.Summary>
            <Styled.SummaryTitle>Resumo do Pedido</Styled.SummaryTitle>
            
            <Styled.Items>
              {itens.map((item) => (
                <Styled.ItemRow key={item.produto.produtoId}>
                  <span>
                    {item.quantidade}x {item.produto.nome}
                  </span>
                  <span>R$ {(item.produto.preco * item.quantidade).toFixed(2)}</span>
                </Styled.ItemRow>
              ))}
            </Styled.Items>

            <Styled.Divider />

            <Styled.SummaryRow>
              <span>Subtotal:</span>
              <span>R$ {getTotal().toFixed(2)}</span>
            </Styled.SummaryRow>
            <Styled.SummaryRow>
              <span>Taxa de entrega:</span>
              <span>R$ 5,00</span>
            </Styled.SummaryRow>

            <Styled.Divider />

            <Styled.Total>
              <span>Total:</span>
              <span>R$ {(getTotal() + 5).toFixed(2)}</span>
            </Styled.Total>

            <Button fullWidth onClick={handleSubmit} disabled={loading}>
              {loading ? "Processando..." : "Confirmar Pedido"}
            </Button>
          </Styled.Summary>
        </Styled.Content>
      </Styled.Container>
    </Layout>
  );
};

export default CheckoutPage;
