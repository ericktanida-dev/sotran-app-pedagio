using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppPedagioTmovPay.Dtos
{
    public class PanDto
    {
        [JsonProperty("pan")]
        public string Pan;
  
        [JsonProperty("cartao")]
        public RechargeCardRequest Cartao;

        [JsonProperty("consultarRecarga")]
        public IList<FetchRechargeResponse> ConsultarRecarga;
    }
}
