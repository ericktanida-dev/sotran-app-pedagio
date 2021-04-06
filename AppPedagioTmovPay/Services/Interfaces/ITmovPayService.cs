using AppPedagioTmovPay.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppPedagioTmovPay.Services.Interfaces
{
    public interface ITmovPayService
    {
        Task<RechargeValueResponse> PreparaValorRecarga(IList<FetchRechargeResponse> request);

        Task<RechargeValueResponse> PreparaValorEstorno(IList<FetchRechargeResponse> request);

        Task<RechargeCardResponse> SolicitarRecarga(PanDto requestDto);

        Task<bool> ConfirmarRecarga(ConfirmRechargeCard requestDto);

        Task<FindByPanResponse> buscarDadosPorPan(string pan);

        Task<IList<FetchRechargeResponse>> ConsultarRecarga(string pan);

        Task<RechargeCardResponse> SolicitarEstorno(PanDto requestDto);
    }
}
