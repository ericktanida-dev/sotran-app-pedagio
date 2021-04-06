using Newtonsoft.Json;

namespace AppPedagioTmovPay.Providers.CardReader.Models
{
    public class AuthResponseDto
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }

        [JsonProperty("expires_in")]
        public int ExpiresIn { get; set; }

        [JsonProperty("refresh_token")]
        public string RefreshToken { get; set; }

        [JsonProperty("refresh_expires_in")]
        public int RefreshExpiresIn { get; set; }

        [JsonProperty("token_type")]
        public string TokenType { get; set; }

        [JsonProperty("id_token")]
        public string IdToken { get; set; }

        [JsonProperty("expiry_date_token")]
        public string ExpiryDateToken { get; set; }

        [JsonProperty("expiry_date_refresh_token")]
        public string ExpiryDateRefreshToken { get; set; }
    }
}
