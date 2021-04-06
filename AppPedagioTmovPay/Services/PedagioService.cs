using AppPedagioTmovPay.Services.Interfaces;
using AppPedagioTmovPay.Dtos;
using AppPedagioTmovPay.Providers.CardReader.Interfaces;
using AppPedagioTmovPay.Providers.CardReader.Models;
using AppPedagioTmovPay.Providers.Helper;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace AppPedagioTmovPay.Services
{
    public class PedagioService : IPedagioService
    {
        private readonly ICardReaderProvider _cardReaderProvider;
        private readonly ITmovPayService _tmovPayService;

        public PedagioService(ICardReaderProvider cardReaderProvider, ITmovPayService tmovPayService)
        {
            _cardReaderProvider = cardReaderProvider;
            _tmovPayService = tmovPayService;
        }

        public EStatusCardReader GetStatusCardReader()
        {
            EStatusCardReader cardReader = _cardReaderProvider.GetStatus();

            return cardReader;
        }

        public BalanceCardDto GetBalanceCard()
        {
            BalanceCardDto balanceCard = _cardReaderProvider.GetBalanceCard();

            return balanceCard;
        }

        public async Task<RechargeCardDto> RechargeCard(IList<FetchRechargeResponse> request)
        {
            BalanceCardDto balanceCard = _cardReaderProvider.GetBalanceCard();

            PanDto panDto = new PanDto();
            panDto.Pan = balanceCard.Pan;


            var consultaRecargaTmovPay = await _tmovPayService.PreparaValorRecarga(request);


            RechargeCardDto rechargeCard = _cardReaderProvider.RechargeCard(consultaRecargaTmovPay.ValueRecharge);

            panDto.Cartao = new RechargeCardRequest()
            {
                CardBalance = balanceCard.Balance,
                HexCardNumber = rechargeCard.HexCardNumber,
                InternalCounterHex = rechargeCard.InternalCounterHex,
                TransactionCounter = rechargeCard.TransactionCounter,
            };
            panDto.ConsultarRecarga = request;

            var solicitarRecargaTmovPay = await _tmovPayService.SolicitarRecarga(panDto);


            bool cofirmRechargeCard = _cardReaderProvider.CofirmRechargeCard(solicitarRecargaTmovPay.Cryptogram);

            ConfirmRechargeCard confirmRechargeCard = new ConfirmRechargeCard();
            confirmRechargeCard.transactionCertificate = "D172C10D5CC4B46C"; //Sanzovo vai verificar
            confirmRechargeCard.chargeIsConfirmed = cofirmRechargeCard;
            confirmRechargeCard.transactionPartnerNumber = consultaRecargaTmovPay.TransactionNumber;
            confirmRechargeCard.consultarRecarga = request;

            await _tmovPayService.ConfirmarRecarga(confirmRechargeCard);// preencher com cofirmRechargeCard 
            if (cofirmRechargeCard == false)
            {
                throw new AppException((int)System.Net.HttpStatusCode.InternalServerError, $@"(_cardReaderProvider.CofirmRechargeCard) - Não foi realizado a confirmação da recarga!", false, "", "");// NotificarEmail()
            }

            return rechargeCard;
        }

        public async Task<int> EstornoCard(IList<FetchRechargeResponse> request)
        {
            BalanceCardDto balanceCard = _cardReaderProvider.GetBalanceCard();

            PanDto panDto = new PanDto();
            panDto.Pan = balanceCard.Pan;

            var consultaRecargaTmovPay = await _tmovPayService.PreparaValorEstorno(request);

            panDto.ConsultarRecarga = request;
            var solicitarRecargaTmovPay = await _tmovPayService.SolicitarEstorno(panDto);


            return 0;
        }

        public async Task<IList<FetchRechargeResponse>> GetListRecharge()
        {
            BalanceCardDto balanceCard = _cardReaderProvider.GetBalanceCard();

            var consultaRecargaTmovPay = await _tmovPayService.ConsultarRecarga(balanceCard.Pan);

            return consultaRecargaTmovPay;
        }
    }
}
