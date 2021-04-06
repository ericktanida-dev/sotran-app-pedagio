using AppPedagioTmovPay.Providers.CardReader.Models;

namespace AppPedagioTmovPay.Providers.CardReader.Interfaces
{
    public interface ICardReaderProvider
    {
        EStatusCardReader GetStatus();
        BalanceCardDto GetBalanceCard();

        RechargeCardDto RechargeCard(string amountToAdd);

        bool CofirmRechargeCard(string cryptogram);
    }
}
