using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppPedagioTmovPay.Dtos
{
    public class RechargeValueResponse
    {
        public string TransactionNumber { get; set; }

        public string? ValueRecharge { get; set; }
    }
}
