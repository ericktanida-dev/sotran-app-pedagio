
using AppPedagioTmovPay.Dtos;
using AppPedagioTmovPay.Providers.CardReader.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppPedagioTmovPay.Services.Interfaces
{
    public interface IPedagioService
    {
        EStatusCardReader GetStatusCardReader();
        BalanceCardDto GetBalanceCard();

        Task<RechargeCardDto> RechargeCard(IList<FetchRechargeResponse> request);

        Task<IList<FetchRechargeResponse>> GetListRecharge();

        Task<int> EstornoCard(IList<FetchRechargeResponse> request);
    }
}
