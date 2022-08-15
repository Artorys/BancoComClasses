class Cliente
{
    constructor(idCliente,tipoCliente,dataCriacao,codBanco,agencia,conta,saldo)
    {
        this.idCliente = idCliente;
        this.tipoCliente = tipoCliente;
        this.dataCriacao = dataCriacao;
        this.codBanco = codBanco;
        this.agencia = agencia;
        this.conta = conta;
        this.saldo = saldo;
        this.historico = []
    }
}
class Empresa extends Cliente
{
    constructor(idCliente,tipoCliente,dataCriacao,codBanco,agencia,conta,saldo,nomeFantasia,cnpj,email,telefone,dataDaFundacao)
    {
        super(idCliente,tipoCliente,dataCriacao,codBanco,agencia,conta,saldo)
        this.nomeFantasia = nomeFantasia;
        this.cnpj = cnpj;
        this.email = email;
        this.telefone = telefone;
        this.dataDaFundacao = dataDaFundacao

    }
}
class Pessoa extends Cliente
{
    constructor(idCliente,tipoCliente,dataCriacao,codBanco,agencia,conta,saldo,nome,cpf,email,telefone,dataDeNascimento)
    {
        super(idCliente,tipoCliente,dataCriacao,codBanco,agencia,conta,saldo)
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.dataDeNascimento = dataDeNascimento;
    }
}
class Transacao
{
    static transferencia(contaOrigem,contaDestino,idTransacao,dataTransacao,valorDaTransferencia)
    {
        const saldoOrigem = contaOrigem.saldo;
        const saldoDestino = contaDestino.saldo

        if(saldoOrigem > saldoDestino)
        {
            contaOrigem.saldo -= valorDaTransferencia
            contaDestino.saldo += valorDaTransferencia

            contaOrigem.historico.push(
                {
                    idTransacao : idTransacao,
                    dataDeTransacao : dataTransacao,
                    valorDaTransferencia : valorDaTransferencia,
                    tipo : "pagamento"

                })
            contaDestino.historico.push(
                {
                    idTransacao : idTransacao,
                    dataTransacao : dataTransacao,
                    valorDaTransferencia : valorDaTransferencia,
                    tipo : "recebimento"
                })
            
            return `Transferência realizada com sucesso!`
        }
        return `Saldo insuficiente para transferência!`
    }
    static deposito(contaDestino,idDeposito,dataDoDeposito,valorDoDeposito)
    {
        contaDestino.saldo += valorDoDeposito;

        contaDestino.historico.push(
            {
                idDeposito : idDeposito,
                dataDoDeposito : dataDoDeposito,
                valorDoDeposito : valorDoDeposito,
                tipo : "recebimento"
            })
        return `Depósito realizado com sucesso!`

    }
    static pagamentoSalario(contaOrigem,contaDestino,idPagamento,dataDoPagamento,valorDoSalario)
    {
        if(contaOrigem instanceof Cliente && valorDoSalario < 1000)
        {
            if(contaOrigem.saldo >= valorDoSalario)
            {
                contaDestino.saldo += valorDoSalario
                contaOrigem.saldo -= valorDoSalario

                contaDestino.historico.push({
                    idPagamento: idPagamento,
                    dataDoPagamento: dataDoPagamento,
                    valorDoSalario: valorDoSalario,
                    tipo: "recebimento",
                })

                contaOrigem.historico.push({
                    idPagamento: idPagamento,
                    dataDoPagamento: dataDoPagamento,
                    valorDoSalario: valorDoSalario,
                    tipo: "pagamento",
                })

                return "Pagamento realizado com sucesso!"
            }
            
            return `"Saldo insuficiente para realizar o pagamento!"`
        }

        return "Seu limite máximo para este tipo de operação é de 1000, entre em contato com o banco!"
    }
}