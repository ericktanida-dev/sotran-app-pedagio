using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppPedagioTmovPay.Dtos
{
    public class ConfirmRechargeCard
    {
        public bool chargeIsConfirmed { get; set; }

        public string transactionCertificate { get; set; }

        public string transactionPartnerNumber { get; set; }

        public IList<FetchRechargeResponse> consultarRecarga { get; set; }
    } 
}
