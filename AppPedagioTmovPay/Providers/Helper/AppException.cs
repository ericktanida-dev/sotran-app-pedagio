using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace AppPedagioTmovPay.Providers.Helper
{
    [Serializable]
    public class AppException : Exception
    {
        public AppException(int Code, string Message, bool Email = false, string EntryRequest = null, string EntryResponse = null)
        {
            StatusCode = Code;
            MessageError = Message;
            NotificaEmail = Email;
            Request = EntryRequest;
            Response = EntryResponse;
        }

        protected AppException(SerializationInfo info, StreamingContext context) : base(info, context) { }

        public int StatusCode { get; set; }
        public string MessageError { get; set; }
        public bool NotificaEmail { get; set; }
        public string Request { get; set; }
        public string Response { get; set; }
    }
}
