using AppPedagioTmovPay.Providers.CardReader.Interfaces;
using AppPedagioTmovPay.Providers.CardReader.Models;
using System;
using System.Runtime.InteropServices;
using System.Text;

namespace AppPedagioTmovPay.Providers.CardReader.Implementations
{
    public class HSTChipAPI : ICardReaderProvider
    {
        [DllImport("HSTChipAPI.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
        internal static extern int CHIPAPI_getStatus(ref int statusOut);

        [DllImport("HSTChipAPI.dll")]
        private static extern int CHIPAPI_inquiryTransaction([Out] StringBuilder PAN, [Out] StringBuilder balance);

        [DllImport("HSTChipAPI.dll")]
        internal static extern int CHIPAPI_rechargeTransaction(string amountToAdd, [Out] StringBuilder outCardData);

        [DllImport("HSTChipAPI.dll")]
        internal static extern int CHIPAPI_updateCardValue(string hostData, [Out] StringBuilder output);

        [DllImport("HSTChipAPI.dll")]
        internal static extern int CHIPAPI_dischargeTransaction(string amountToRemove, [Out] StringBuilder outCardData);

        public EStatusCardReader GetStatus()
        {
            int statusOut = 0;
            CHIPAPI_getStatus(ref statusOut);
            return EStatusCardReaderExtension.IntToEnum(statusOut);
        }

        public BalanceCardDto GetBalanceCard()
        {
            StringBuilder pan = new StringBuilder(32);
            StringBuilder balance = new StringBuilder(32);
            
            int num = CHIPAPI_inquiryTransaction(pan, balance);
            
            BalanceCardDto balanceCard = new BalanceCardDto();
            
            if (num == 0)
            {
                balanceCard.Pan = pan.ToString();
                balanceCard.Balance = Convert.ToDecimal(balance.ToString());
            }
            return balanceCard;
        }

        public RechargeCardDto RechargeCard(string amountToAdd)
        {
            StringBuilder cardData = new StringBuilder(1024);
            int num = CHIPAPI_rechargeTransaction(amountToAdd, cardData);
            RechargeCardDto rechargeCard = new RechargeCardDto();
            if (num == 0)
            {
                string[] cardWords = cardData.ToString().Split('|');
                rechargeCard.Pan = cardWords[0];
                rechargeCard.HexCardNumber = cardWords[1];
                rechargeCard.TransactionCounter = Convert.ToInt32(cardWords[2]);
                rechargeCard.InternalCounterHex = cardWords[3];
            }
            return rechargeCard;
        }
        public bool CofirmRechargeCard(string cryptogram)
        {
            StringBuilder output = new StringBuilder(1024);
            int num = CHIPAPI_updateCardValue(cryptogram, output);
            return num == 0;
        }


        public static int dischargeTransaction(string amountToRemove, out string cardData)
        {
            cardData = "";
            StringBuilder outCardData = new StringBuilder(1024);
            int num = HSTChipAPI.CHIPAPI_rechargeTransaction(amountToRemove, outCardData);
            if (num == 0)
                cardData = outCardData.ToString();
            return num;
        }
    }
}
