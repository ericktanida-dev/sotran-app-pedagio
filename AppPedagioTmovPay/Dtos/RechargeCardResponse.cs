using System;

namespace AppPedagioTmovPay.Dtos
{
    public class RechargeCardResponse
    {
        public string TransactionCode { get; set; }

        public DateTime ChargeDate  { get; set; }

        public string Cryptogram  { get; set; }

        public int TransactionNumber  { get; set; }

    }
}
