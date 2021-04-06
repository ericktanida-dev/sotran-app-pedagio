using System;
using System.ComponentModel;
using System.Runtime.Serialization;

namespace AppPedagioTmovPay.Providers.CardReader.Models
{
    public enum EStatusCardReader
    {
        [EnumMember]
        [Description("Cartão inserido no leitor")]
        CardPresent = 0,

        [EnumMember]
        [Description("Cartão fora do leitor")]
        CardNotPresent = 1,

        [EnumMember]
        [Description("Leitora não conectada")]
        CardReaderNotPresent = 2,
    }

    public static class EStatusCardReaderExtension
    {
        public static EStatusCardReader IntToEnum(int eStatusCardReader)
        {
            switch (eStatusCardReader)
            {
                case 0:
                    return EStatusCardReader.CardPresent;
                case 1:
                    return EStatusCardReader.CardNotPresent;
                case 2:
                    return EStatusCardReader.CardReaderNotPresent;
                default:
                    throw new ArgumentOutOfRangeException(nameof(eStatusCardReader), eStatusCardReader, null);
            }
        }
    }
}
