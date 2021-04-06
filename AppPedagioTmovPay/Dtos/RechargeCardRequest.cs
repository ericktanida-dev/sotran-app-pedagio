using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppPedagioTmovPay.Dtos
{
    public class RechargeCardRequest
    {
        [JsonProperty("hexCardNumber")]
        public string HexCardNumber;

        [JsonProperty("internalCounterHex")]
        public string InternalCounterHex;

        [JsonProperty("transactionCounter")]
        public int TransactionCounter;

        [JsonProperty("cardBalance")]
        public decimal? CardBalance;
    }
}
