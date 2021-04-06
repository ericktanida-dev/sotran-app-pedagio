using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppPedagioTmovPay.Providers.CardReader.Models
{
    public class RechargeCardDto
    {
        public string Pan { get; set; }
        public string HexCardNumber { get; set; }
        public int TransactionCounter { get; set; }
        public string InternalCounterHex { get; set; }
    }
}
