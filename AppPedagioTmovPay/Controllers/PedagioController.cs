using AppPedagioTmovPay.Dtos;
using AppPedagioTmovPay.Providers.CardReader.Models;
using AppPedagioTmovPay.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppPedagioTmovPay.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class PedagioController : ControllerBase
    {
        private readonly IPedagioService _pedagioService;
        private readonly ITmovPayService _tmovPayService;


        public PedagioController(IPedagioService pedagioService, ITmovPayService tmovPayService)
        {
            _pedagioService = pedagioService;
            _tmovPayService = tmovPayService;
        }

        [HttpGet]
        public EStatusCardReader GetStatusCardReader()
        {
            EStatusCardReader cardReader = _pedagioService.GetStatusCardReader();

            return cardReader;
        }

        [HttpGet]
        public BalanceCardDto GetBalanceCard()
        {
            BalanceCardDto balanceCard = _pedagioService.GetBalanceCard();

            return balanceCard;
        }

        [HttpPost]
        public async Task<RechargeCardDto> RechargeCard([FromBody] IList<FetchRechargeResponse> request)
        {
            RechargeCardDto rechargeCard = await _pedagioService.RechargeCard(request);
            return rechargeCard;
        }

        [HttpPost]
        public async Task<int> EstornoCard([FromBody] IList<FetchRechargeResponse> request)
        {
            int rechargeCard = await _pedagioService.EstornoCard(request);
            return rechargeCard;
        }


        [HttpGet]
        public async Task<FindByPanResponse> BuscarDadosPorPan()
        {
            BalanceCardDto balanceCard = this.GetBalanceCard();
            FindByPanResponse data = new FindByPanResponse();

            try
            {
                data = await _tmovPayService.buscarDadosPorPan(balanceCard.Pan);
            } catch (Exception e)
            {}
            data.Saldo = balanceCard.Balance;

            return data;
        }

        [HttpGet]
        public async Task<IList<FetchRechargeResponse>> BuscarPedagiosPorPan()
        {
            IList<FetchRechargeResponse> data = await _pedagioService.GetListRecharge();

            return data;
        }
        
    }
}

