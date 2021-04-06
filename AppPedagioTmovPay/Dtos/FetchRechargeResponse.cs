using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppPedagioTmovPay.Dtos
{
    public class FetchRechargeResponse
    {
        [JsonProperty("idContrato")]
        public string IdContrato { get; set; }

        [JsonProperty("idParcela")]
        public int IdParcela { get; set; }

        [JsonProperty("valorOriginal")]
        public string ValorOriginal { get; set; }

        [JsonProperty("tipo")]
        public string Tipo{ get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("idCliente")]
        public int IdCliente { get; set; }

        [JsonProperty("idContaDock")]
        public int IdContaDock { get; set; }
    }
}
