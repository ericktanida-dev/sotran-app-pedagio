using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppPedagioTmovPay.Dtos
{
    public class FindByPanResponse
    {
        public string NomeImpresso { get; set; }

        public bool Ativo { get; set; }

        public decimal? Saldo { get; set; }
    }
}
